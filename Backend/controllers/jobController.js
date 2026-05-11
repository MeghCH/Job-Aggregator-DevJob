const pool = require('../config/db');

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
                skills
            } = req.body;

            // Required fields
            if (!id || !company_id || !title) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide id, company_id and title'
                });
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
                    experience_years, remote_type, skills, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
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
                    skills ? JSON.stringify(skills) : null
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

    /**
     * @route GET /api/jobs
     * @desc Get all job offers (unified view: WLD + DJ)
     * @access Public
     */
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
    }
};

module.exports = JobController;
