<<<<<<< HEAD
# ADR-DATA — Data Collection and Integration Strategy

**Date :** 05/05/2026
**Status :** Accepted

---

## Context

The project requires a real-world data source for tech job offers.
The requirements mandate the integration of the WeLoveDevs API as a compulsory source,
with a rate limit of 1 request/second/student.
Data must be normalized before storage to ensure
data model consistency.
=======
# ADR-DATA — Stratégie de collecte et d'intégration des données

**Date :** 05/05/2026
**Statut :** Accepté

---

## Contexte

Le projet nécessite une source de données réelle d'offres d'emploi tech.
Le sujet impose l'intégration de l'API WeLoveDevs comme source obligatoire,
avec un rate limit de 1 requête/seconde/étudiant.
Les données doivent être normalisées avant stockage pour garantir
la cohérence du modèle de données.
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c

---

## Why

<<<<<<< HEAD
Without a real data source, the platform has no value for
users. WeLoveDevs provides recent tech offers in France
that are relevant to our target audience (junior developers and
Epitech students). Normalization is necessary because
external data can be incomplete or poorly formatted.
=======
Sans source de données réelle, la plateforme n'a pas de valeur pour
les utilisateurs. WeLoveDevs fournit des offres tech françaises
récentes et pertinentes pour notre cible (développeurs juniors et
étudiants Epitech). La normalisation est nécessaire car les données
externes peuvent être incomplètes ou mal formatées.
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c

---

## How

<<<<<<< HEAD
### Primary source — WeLoveDevs API

- Integration via the WeLoveDevs REST API (OpenAPI 3.0)
- API key obtained via [https://epi-api.welovedevs.com/ask-for-api-key/](https://epi-api.welovedevs.com/ask-for-api-key/)
- Manual ingestion trigger via a dedicated endpoint
- Rate limit managed with a 1 req/s queue

### Ingestion pipeline

```mermaid
flowchart TD
    A[WeLoveDevs API] -->|1 req/s| B[Fetch offers]
    B --> C[Normalization / cleaning]
    C --> C1[Missing fields <br/>→ default values]
    C --> C2[Salary → EUR conversion]
    C --> C3[Skills → JSON array]
    C --> C4[Date → ISO 8601 format]
    C1 & C2 & C3 & C4 --> D[Deduplication]
    D -->|existing id| E[Ignored]
    D -->|new| F[(MySQL Storage<br/>job_offers table)]
=======
### Source principale — WeLoveDevs API

- Intégration via l'API REST WeLoveDevs (OpenAPI 3.0)
- Clé API obtenue via https://epi-api.welovedevs.com/ask-for-api-key/
- Déclenchement manuel de l'ingestion via un endpoint dédié
- Rate limit géré avec une file d'attente de 1 req/s

### Pipeline d'ingestion

```mermaid
flowchart TD
    A[WeLoveDevs API] -->|1 req/s| B[Fetch des offres]
    B --> C[Normalisation / nettoyage]
    C --> C1[Champs manquants <br/>→ valeurs par défaut]
    C --> C2[Salaire → conversion EUR]
    C --> C3[Skills → tableau JSON]
    C --> C4[Date → format ISO 8601]
    C1 & C2 & C3 & C4 --> D[Déduplication]
    D -->|id existant| E[Ignoré]
    D -->|nouveau| F[(Stockage MySQL<br/>table job_offers)]
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c

    style A fill:#7C3AED,color:#fff
    style B fill:#2563EB,color:#fff
    style C fill:#0891B2,color:#fff
    style C1 fill:#E0F2FE,color:#0C4A6E
    style C2 fill:#E0F2FE,color:#0C4A6E
    style C3 fill:#E0F2FE,color:#0C4A6E
    style C4 fill:#E0F2FE,color:#0C4A6E
    style D fill:#D97706,color:#fff
    style E fill:#DC2626,color:#fff
    style F fill:#16A34A,color:#fff
```

<<<<<<< HEAD
### Normalized data model

Each stored offer contains:

- `id` — unique identifier
- `title` — job title
- `description` — full description
- `company_id` — company reference
- `salary_min` / `salary_max` — salary range
- `currency` — currency (EUR by default)
- `remote_type` — remote / hybrid / onsite
- `skills` — JSON array of skills
- `experience_years` — required years of experience
- `created_at` — publication date

### Rate limit management

```js
// 1-second wait between each request
=======
### Modèle de données normalisé

Chaque offre stockée contient :

- `id` — identifiant unique
- `title` — intitulé du poste
- `description` — description complète
- `company_id` — référence entreprise
- `salary_min` / `salary_max` — fourchette salariale
- `currency` — devise (EUR par défaut)
- `remote_type` — remote / hybrid / onsite
- `skills` — tableau JSON de compétences
- `experience_years` — années d'expérience requises
- `created_at` — date de publication

### Gestion du rate limit

```js
// Attente de 1 seconde entre chaque requête
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
for (const offer of offers) {
  await fetchAndStore(offer);
  await delay(1000);
}
```

---

## Trade-off

<<<<<<< HEAD
| Advantage                           | Disadvantage                                       |
| ----------------------------------- | -------------------------------------------------- |
| Real and recent data                | Dependency on an external API                      |
| Targeted French tech offers         | 1 req/s rate limit slows down ingestion            |
| Official Epitech partnership        | API key linked to @epitech.eu address              |
| Normalization guarantees consistency| Possible loss of data specific to WeLoveDevs       |

---

## Rejected alternative

### Web scraping

**Why rejected:** Illegal without authorization, fragile (depends on HTML),
blocked by anti-bot protections. The WeLoveDevs partnership provides
an official and stable API — scraping adds no value
and creates legal risks.

### Static / mock data

**Why rejected:** The project explicitly mandates real data.
Mocked data does not allow for demonstrating the ingestion pipeline
nor the product value for users.

---

## References

- API doc : [https://epi-api.welovedevs.com/](https://epi-api.welovedevs.com/)
=======
| Avantage                            | Inconvénient                                       |
| ----------------------------------- | -------------------------------------------------- |
| Données réelles et récentes         | Dépendance à une API externe                       |
| Offres tech françaises ciblées      | Rate limit de 1 req/s ralentit l'ingestion         |
| Partenariat officiel Epitech        | Clé API liée à l'adresse @epitech.eu               |
| Normalisation garantit la cohérence | Perte possible de données spécifiques à WeLoveDevs |

---

## Alternative rejetée

### Scraping web

**Pourquoi rejeté :** Illégal sans autorisation, fragile (dépend du HTML),
bloqué par les protections anti-bot. Le partenariat WeLoveDevs offre
une API officielle et stable — le scraping n'apporte aucune valeur ajoutée
et crée des risques légaux.

### Données statiques / mock

**Pourquoi rejeté :** Le sujet impose explicitement des données réelles.
Des données mockées ne permettent pas de démontrer le pipeline d'ingestion
ni la valeur produit pour les utilisateurs.

---

## Références

<!-- - Code : `controllers/jobController.js` -->
<!-- - Pipeline : `services/ingestionService.js` -->

- API doc : https://epi-api.welovedevs.com/
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c
