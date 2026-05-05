const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

/**
 * @route   POST /api/jobs
 * @desc    Create a new job offer
 * @access  Private (Recruiter, Admin)
 */
router.post(
    '/',
    authenticateToken,
    authorizeRoles('recruiter', 'admin'),
    JobController.create
);

/**
 * @route   GET /api/jobs
 * @desc    Get all job offers
 * @access  Public
 */
router.get('/', JobController.getAll);

module.exports = router;
