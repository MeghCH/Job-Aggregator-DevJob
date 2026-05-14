const pool = require('../config/db');
const axios = require('axios');
/**
 * @description Job Controller
 * Handles job offer creation and retrieval
 */
const JobController = {
    /**
     * @route POST /api/jobs
     * @desc Create a new job offer (recruiter or admin only)
     * @access Private (Recruiter, Admin)
     */
    async create(req, res) {
        try {
            const {
                id,
                company_id,
                title,
                description,
                salary_min,
                salary_max,
                currency,
                experience_years,
                remote_type,
                location,
                skills
            } = req.body;

            // Required fields
            if (!id || !company_id || !title) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide id, company_id and title'
                });
            }

            let ai_summary = null;
            let ai_tags = null;
            if (description) {
                try {
                    // 1. On appelle ton API IA pour le résumé
                    // On utilise 'ai-service' car c'est le nom dans ton docker-compose
                    const resSum = await axios.post('http://ai-service:8000/summarize', { description });
                    ai_summary = resSum.data.summary;

                    // 2. On appelle ton API IA pour les technos (Analyze)
                    const resAna = await axios.post('http://ai-service:8000/analyze', { description });
                    ai_tags = JSON.stringify(resAna.data.analysis); // On stocke la liste en JSON
                } catch (iaError) {
                    console.error("Erreur IA (le serveur FastAPI est-il lancé ?) :", iaError.message);
                    // On ne bloque pas la création de l'offre si l'IA échoue
                }
            }

            // Check if company exists
            const [companies] = await pool.query(
                'SELECT * FROM companies_dj WHERE id = ?',
                [company_id]
            );

            if (companies.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Company not found'
                });
            }

            // Insert into jobs_dj
            const [result] = await pool.query(
                `INSERT INTO jobs_dj (
                    id, company_id, title, description,
                    salary_min, salary_max, currency,
                    experience_years, remote_type, location, skills, ai_summary, ai_tags, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                [
                    id,
                    company_id,
                    title,
                    description || null,
                    salary_min || null,
                    salary_max || null,
                    currency || null,
                    experience_years || null,
                    remote_type || null,
                    location || null,
                    skills ? JSON.stringify(skills) : null,
                    ai_summary,
                    ai_tags
                ]
            );

            const [newJob] = await pool.query(
                'SELECT * FROM jobs_dj WHERE id = ?',
                [id]
            );

            return res.status(201).json({
                success: true,
                message: 'Job offer created successfully',
                data: newJob[0]
            });

        } catch (error) {
            console.error('Create job error:', error);

            // Duplicate entry
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    success: false,
                    message: 'A job with this id already exists'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Error creating job offer'
            });
        }
    },

    async getRecruiter(req, res) {
        try {
            const { userId, role } = req.user;

            if (role === 'admin') {
                const [jobs] = await pool.query('SELECT * FROM jobs_dj ORDER BY created_at DESC');
                return res.status(200).json({ success: true, count: jobs.length, data: jobs });
            }

            const [users] = await pool.query(
                'SELECT company FROM users WHERE id = ?',
                [userId]
            );

            if (users.length === 0 || !users[0].company) {
                return res.status(404).json({ success: false, message: 'No company linked to this account' });
            }

            const [jobs] = await pool.query(
                `SELECT j.* FROM jobs_dj j
                 JOIN companies_dj c ON j.company_id = c.id
                 WHERE c.name = ?
                 ORDER BY j.created_at DESC`,
                [users[0].company]
            );

            return res.status(200).json({ success: true, count: jobs.length, data: jobs });
        } catch (error) {
            console.error('Get recruiter jobs error:', error);
            return res.status(500).json({ success: false, message: 'Error fetching your jobs' });
        }
    },

    async getAll(req, res) {
        try {
            const [jobs] = await pool.query('SELECT * FROM unified_jobs ORDER BY created_at DESC');

            return res.status(200).json({
                success: true,
                count: jobs.length,
                data: jobs
            });

        } catch (error) {
            console.error('Get jobs error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching job offers'
            });
        }
    },

    /**
     * @route DELETE /api/jobs/clean-unknown
     * @desc Delete job offers with unknown company or blank title (admin only)
     * @access Private (Admin)
     */
    async cleanUnknown(req, res) {
        try {
            const [rows] = await pool.query(`
                SELECT COUNT(*) as badCount
                FROM jobs_wld j
                JOIN companies_wld c ON j.company_id = c.id
                WHERE c.name = 'Inconnue' OR j.title = 'Sans titre'
            `);
            const badCount = rows[0]?.badCount || 0;

            if (badCount === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'No unknown or untitled jobs found.',
                    deleted: 0
                });
            }

            const [result] = await pool.query(`
                DELETE j FROM jobs_wld j
                JOIN companies_wld c ON j.company_id = c.id
                WHERE c.name = 'Inconnue' OR j.title = 'Sans titre'
            `);

            const deleted = result.affectedRows || 0;

            const [orphanResult] = await pool.query(`
                DELETE c FROM companies_wld c
                LEFT JOIN jobs_wld j ON j.company_id = c.id
                WHERE j.id IS NULL
            `);
            const orphanDeleted = orphanResult.affectedRows || 0;

            return res.status(200).json({
                success: true,
                message: `${deleted} unknown/untitled job(s) removed. ${orphanDeleted} orphaned company(ies) cleaned.`,
                deleted,
                orphanCompaniesDeleted: orphanDeleted
            });
        } catch (error) {
            console.error('Clean unknown jobs error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error cleaning unknown job offers'
            });
        }
    },
};

module.exports = JobController;
