const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');







router.get('/', authenticateToken, authorizeRoles('admin'), UserController.getAllUsers);


module.exports = router;