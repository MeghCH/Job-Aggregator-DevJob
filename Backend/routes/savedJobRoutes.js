const express = require('express');
const router = express.Router();
const SavedJobController = require('../controllers/savedJobController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, SavedJobController.getSavedJobs);
router.get('/ids', authenticateToken, SavedJobController.getSavedIds);
router.post('/', authenticateToken, SavedJobController.saveJob);
router.delete('/:job_id', authenticateToken, SavedJobController.unsaveJob);

module.exports = router;
