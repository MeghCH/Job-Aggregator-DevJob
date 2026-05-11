const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const authenticateToken = require("../middleware/roleMiddleware");
const isAdmin = require("../middleware/adminMiddleware"); // Middleware de sécurité


router.use(authenticateToken);
router.use(isAdmin);

/**
 * Gestion des utilisateurs
 */


router.get("/users", AdminController.getAllUsers);


router.get("/users/:id", AdminController.getUserById);


router.patch("/users/:id", AdminController.updateUser);


router.delete("/users/:id", AdminController.deleteUser);

module.exports = router;