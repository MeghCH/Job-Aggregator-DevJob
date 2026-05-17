const express = require('express');
const router = express.Router();

// On importe précisément chaque fonction depuis le contrôleur
const { 
    getAllJobsForAdmin, 
    updateJobStatus, 
    deleteJob, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} = require('../controllers/adminController');

// --- ROUTES JOBS ---
// Pour appeler : GET http://localhost:3000/api/admin/jobs
router.get('/jobs', getAllJobsForAdmin);

// Pour appeler : PATCH http://localhost:3000/api/admin/jobs/ID_DU_JOB
router.patch('/jobs/:id', updateJobStatus);

// Pour appeler : DELETE http://localhost:3000/api/admin/jobs/ID_DU_JOB
router.delete('/jobs/:id', deleteJob);


// --- ROUTES USERS ---
// Pour appeler : GET http://localhost:3000/api/admin/users
router.get('/users', getAllUsers);

// Pour appeler : PATCH http://localhost:3000/api/admin/users/ID_USER
router.patch('/users/:id', updateUser);

// Pour appeler : DELETE http://localhost:3000/api/admin/users/ID_USER
router.delete('/users/:id', deleteUser);

module.exports = router;