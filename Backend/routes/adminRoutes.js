const express = require('express');
const router = express.Router();

const { 
    getAllJobsForAdmin, 
    updateJobStatus, 
    deleteJob, 
    getAllUsers, 
    getUserById,
    updateUser, 
    deleteUser, 
    registerAdmin 
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

// Pour appeler : GET http://localhost:3000/api/admin/users/ID_USER
router.get('/users/:id', getUserById);

// Pour appeler : PATCH http://localhost:3000/api/admin/users/ID_USER
router.patch('/users/:id', updateUser);

// Pour appeler : DELETE http://localhost:3000/api/admin/users/ID_USER
router.delete('/users/:id', deleteUser);

// POST http://localhost:3000/api/admin/setup-master
router.post('/setup-master', registerAdmin);

module.exports = router;