const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job offer management endpoints
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job offer
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, company_id, title]
 *             properties:
 *               id:
 *                 type: string
 *                 example: job-001
 *               company_id:
 *                 type: string
 *                 example: comp-001
 *               title:
 *                 type: string
 *                 example: Senior Fullstack Developer
 *               description:
 *                 type: string
 *               salary_min:
 *                 type: integer
 *                 example: 50000
 *               salary_max:
 *                 type: integer
 *                 example: 70000
 *               currency:
 *                 type: string
 *                 example: EUR
 *               experience_years:
 *                 type: integer
 *                 example: 5
 *               remote_type:
 *                 type: string
 *                 example: hybrid
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "React", "Node.js"]
 *     responses:
 *       201:
 *         description: Job offer created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden — requires recruiter or admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Duplicate job ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    '/',
    authenticateToken,
    authorizeRoles('recruiter', 'admin'),
    JobController.create
);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job offers
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all job offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 count: { type: integer }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job offer by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Job not found
 *       401:
 *         description: No token provided
 *       500:
 *         description: Server error
 */
router.get('/recruiter', authenticateToken, authorizeRoles('recruiter', 'admin'), JobController.getRecruiter);
router.get('/scored', authenticateToken, JobController.getScoredJobs);
router.delete('/:id', authenticateToken, authorizeRoles('recruiter', 'admin'), JobController.deleteById);
router.get('/:id', JobController.getById);
router.get('/', JobController.getAll);

/**
 * @swagger
 * /api/jobs/summarize:
 * post:
 * summary: Summarize a job description using AI
 * tags: [Jobs]
 */
router.post('/summarize', JobController.summarize);
router.post('/analyze', JobController.analyze);
// Dans ton fichier routes/jobRoutes.js

// Route pour transférer la demande de résumé à l'IA locale (Port 8000)
router.post('/summarize', async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ success: false, message: "La description est requise." });
        }

        // Le backend appelle l'IA (FastAPI) en local sur le port 8000
        const iaResponse = await fetch('http://localhost:8000/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        });

        if (!iaResponse.ok) {
            return res.status(502).json({ 
                success: false, 
                message: "L'IA a renvoyé une erreur ou n'est pas disponible." 
            });
        }

        const data = await iaResponse.json();
        
        // On renvoie la réponse formatée au frontend (3001)
        return res.json({ 
            success: true, 
            summary: data.summary 
        });

    } catch (error) {
        console.error("Erreur passerelle IA dans jobRoutes:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Erreur interne lors de la communication avec l'IA." 
        });
    }
});
module.exports = router;
