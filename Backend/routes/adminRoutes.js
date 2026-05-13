const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

// 1. Importe le VRAI middleware d'authentification (celui qui vérifie le JWT)
// Vérifie si dans ton dossier middleware il s'appelle 'authMiddleware' ou 'auth'
const authenticateToken = require("../middleware/authMiddleware"); 

// 2. Importe ton middleware admin (attention à l'orthographe exacte de ton fichier !)
const isAdmin = require("../middleware/adminMiddleware"); 


// 3. Réactive les verrous
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