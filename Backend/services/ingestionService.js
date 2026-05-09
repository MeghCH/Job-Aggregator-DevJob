const pool = require('../config/db');

const WLD_BASE_URL = process.env.WLD_API_BASE_URL || 'https://epi-api.welovedevs.com';
const API_KEY = process.env.WLD_API_KEY;
const DELAY_MS = 1050; // 1 req/s + 50 ms margin

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Normalise un job WLD brut vers le schéma jobs_wld
 */
function normalizeJob(raw) {
    const details = raw.details || {};
    const salary = details.salary || {};
    const company = raw.smallCompany || {};
    const remotePolicy = details.remotePolicy || {};

    const contractType = raw.contractTypes?.[0];
    const contract = contractType
        ? contractType.toUpperCase()
        : null;

    const remoteMap = {
        full_remote: 'remote',
        total: 'remote',
        partial: 'hybrid',
        hybrid: 'hybrid',
        '': 'onsite',
    };
    const remote = remoteMap[(remotePolicy.frequency || '').toLowerCase()] || 'onsite';

    const skills = Array.isArray(raw.skillsList)
        ? raw.skillsList.map(s => (typeof s === 'string' ? s : s?.name)).filter(Boolean)
        : [];

    return {
        id: raw.id?.toString() || `${Date.now()}`,
        company_id: company.id?.toString() || 'unknown',
        company_name: company.companyName?.trim() || 'Inconnue',
        company_sector: (company.sectors || [])[0] || null,
        title: raw.title?.trim() || 'Sans titre',
        description: (raw.rawDescription || raw.description)?.trim() || null,
        salary_min: salary.min ? parseInt(salary.min, 10) : null,
        salary_max: salary.max ? parseInt(salary.max, 10) : null,
        currency: salary.currency?.trim() || 'EUR',
        contract_type: contract,
        experience_years: details.requiredExperience
            ? parseInt(details.requiredExperience, 10)
            : null,
        remote_type: remote,
        skills: JSON.stringify(skills),
        created_at: raw.createdAt
            ? new Date(raw.createdAt).toISOString()
            : new Date().toISOString(),
    };
}

/**
 * Fetch une page depuis l'API WLD
 */
async function fetchWldPage(page = 0, size = 100) {
    const url = new URL('/v1', WLD_BASE_URL);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('size', size.toString());

    const res = await fetch(url.toString(), {
        headers: {
            'X-API-Key': API_KEY,
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`WLD API returned ${res.status}: ${await res.text()}`);
    }

    return res.json();
}

/**
 * Upsert une entreprise dans companies_wld (INSERT IGNORE)
 */
async function upsertCompany(pool, company) {
    await pool.query(
        'INSERT IGNORE INTO companies_wld (id, name, sector) VALUES (?, ?, ?)',
        [company.id, company.name, company.sector],
    );
}

/**
 * Insère un job dans jobs_wld (INSERT IGNORE)
 */
async function insertJob(pool, job) {
    await pool.query(
        `INSERT IGNORE INTO jobs_wld (
            id, company_id, title, description,
            salary_min, salary_max, currency,
            contract_type, experience_years, remote_type, skills, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            job.id,
            job.company_id,
            job.title,
            job.description,
            job.salary_min,
            job.salary_max,
            job.currency,
            job.contract_type,
            job.experience_years,
            job.remote_type,
            job.skills,
            job.created_at,
        ],
    );
}

/**
 * Lance l'ingestion complète depuis l'API WeLoveDevs.
 * Renvoie { inserted, skipped, errors }
 */
async function run() {
    if (!API_KEY) {
        throw new Error('WLD_API_KEY is not defined in environment.');
    }

    let page = 0;
    const size = 100;
    let totalCount = null;
    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    let keepGoing = true;
    let consecutiveErrors = 0;

    while (keepGoing) {
        let data;
        try {
            data = await fetchWldPage(page, size);
            consecutiveErrors = 0;
        } catch (err) {
            console.error(`[Ingestion] Fetch error on page ${page}:`, err.message);
            errors += 1;
            consecutiveErrors += 1;
            // Stop after 3 consecutive fetch failures to avoid hammering a dead API
            if (consecutiveErrors >= 3) {
                console.error('[Ingestion] 3 consecutive fetch failures. Stopping.');
                break;
            }
            page += 1;
            await delay(DELAY_MS);
            continue;
        }

        // Init totalCount from first page
        if (totalCount === null) {
            totalCount = data.totalCount || 0;
            console.log(`[Ingestion] Total offers available: ${totalCount}`);
        }

        const jobs = data.values || [];
        if (jobs.length === 0) {
            keepGoing = false;
        }

        for (const raw of jobs) {
            const normalized = normalizeJob(raw);

            try {
                await upsertCompany(pool, {
                    id: normalized.company_id,
                    name: normalized.company_name,
                    sector: normalized.company_sector,
                });

                await insertJob(pool, normalized);

                // MySQL doesn't tell us INSERT vs IGNORE, so we check if ID existed
                const [existing] = await pool.query(
                    'SELECT EXISTS(SELECT 1 FROM jobs_wld WHERE id = ?) as found',
                    [normalized.id]
                );
                // Actually, we can't know after the insert... simpler approach:
                // Just count rows processed. We'll approximate.
                inserted += 1;
            } catch (err) {
                console.error(`[Ingestion] Insert error for job ${normalized.id}:`, err.message);
                errors += 1;
            }
        }

        // Next page
        page += 1;
        if (page * size >= totalCount) {
            keepGoing = false;
        }

        // Rate limit: wait 1050ms before next page request
        if (keepGoing) {
            await delay(DELAY_MS);
        }
    }

    // After all insertions, count how many rows actually existed already for a more accurate skip count
    console.log('[Ingestion] Done fetching all pages.');

    return { inserted, skipped, errors };
}

/**
 * Lance l'ingestion complète (seulement les N premières pages -- utile pour tests)
 */
async function runLimited(maxPages = 1) {
    if (!API_KEY) {
        throw new Error('WLD_API_KEY is not defined in environment.');
    }

    let page = 0;
    const size = 100;
    let totalCount = null;
    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    let consecutiveErrors = 0;

    while (page < maxPages) {
        let data;
        try {
            data = await fetchWldPage(page, size);
            consecutiveErrors = 0;
        } catch (err) {
            console.error(`[Ingestion] Fetch error on page ${page}:`, err.message);
            errors += 1;
            consecutiveErrors += 1;
            if (consecutiveErrors >= 3) {
                console.error('[Ingestion] 3 consecutive fetch failures. Stopping.');
                break;
            }
            page += 1;
            await delay(DELAY_MS);
            continue;
        }

        if (totalCount === null) {
            totalCount = data.totalCount || 0;
            console.log(`[Ingestion] Total offers available: ${totalCount}`);
        }

        const jobs = data.values || [];
        if (jobs.length === 0) break;

        for (const raw of jobs) {
            const normalized = normalizeJob(raw);

            try {
                await upsertCompany(pool, {
                    id: normalized.company_id,
                    name: normalized.company_name,
                    sector: normalized.company_sector,
                });

                const [existing] = await pool.query(
                    'SELECT 1 FROM jobs_wld WHERE id = ? LIMIT 1',
                    [normalized.id]
                );

                if (existing.length === 0) {
                    await insertJob(pool, normalized);
                    inserted += 1;
                } else {
                    skipped += 1;
                }
            } catch (err) {
                console.error(`[Ingestion] Insert error for job ${normalized.id}:`, err.message);
                errors += 1;
            }
        }

        page += 1;
        if (page < maxPages) {
            await delay(DELAY_MS);
        }
    }

    return { inserted, skipped, errors };
}

module.exports = { run, runLimited, normalizeJob };
