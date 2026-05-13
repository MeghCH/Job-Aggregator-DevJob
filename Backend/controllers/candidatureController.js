const pool = require('../config/db');

const CandidatureController = {
    async getMyApplications(req, res) {
        try {
            const userId = req.user.userId;

            const [rows] = await pool.query(
                `SELECT a.id, a.job_id, a.job_source, a.applied_at,
                        j.title, j.company_name, j.contract_type, j.remote_type,
                        j.salary_min, j.salary_max, j.currency, j.skills
                 FROM applications a
                 LEFT JOIN unified_jobs j ON a.job_id = j.id
                 WHERE a.user_id = ?
                 ORDER BY a.applied_at DESC`,
                [userId]
            );

            return res.status(200).json({ success: true, data: rows });
        } catch (error) {
            console.error('Get applications error:', error);
            return res.status(500).json({ success: false, message: 'Error fetching applications' });
        }
    },

    async getApplicationById(req, res) {
        try {
            const userId = req.user.userId;
            const { id } = req.params;

            const [rows] = await pool.query(
                `SELECT a.id, a.job_id, a.job_source, a.applied_at,
                        j.title, j.company_name, j.contract_type, j.remote_type,
                        j.salary_min, j.salary_max, j.currency, j.skills
                 FROM applications a
                 LEFT JOIN unified_jobs j ON a.job_id = j.id
                 WHERE a.id = ? AND a.user_id = ?`,
                [id, userId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Application not found' });
            }

            return res.status(200).json({ success: true, data: rows[0] });
        } catch (error) {
            console.error('Get application by id error:', error);
            return res.status(500).json({ success: false, message: 'Error fetching application' });
        }
    },

    async apply(req, res) {
        try {
            const userId = req.user.userId;
            const { job_id, job_source } = req.body;

            if (!job_id || !job_source) {
                return res.status(400).json({ success: false, message: 'job_id and job_source are required' });
            }

            await pool.query(
                'INSERT INTO applications (user_id, job_id, job_source) VALUES (?, ?, ?)',
                [userId, job_id, job_source]
            );

            return res.status(201).json({ success: true, message: 'Application submitted' });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: 'Already applied to this job' });
            }
            console.error('Apply error:', error);
            return res.status(500).json({ success: false, message: 'Error submitting application' });
        }
    },
};

module.exports = CandidatureController;
