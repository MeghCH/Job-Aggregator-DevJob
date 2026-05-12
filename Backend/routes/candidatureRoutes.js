const express = require('express');
const router = express.Router();
const CandidatureController = require('../controllers/candidatureController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, CandidatureController.getMyApplications);
router.post('/', authenticateToken, CandidatureController.apply);

module.exports = router;
