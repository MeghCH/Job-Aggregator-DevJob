const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

/**
 * @swagger
 * /api/admin/setup-master:
 *   post:
 *     summary: Create the first admin account (setup)
 *     description: |
 *       Registers the very first administrator account.
 *       Auto-locks after the first admin exists in the database.
 *       No authentication required.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, firstname, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               firstname:
 *                 type: string
 *                 example: System
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@company.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *               company:
 *                 type: string
 *                 example: DevJobs
 *               siret:
 *                 type: string
 *                 example: 12345678901234
 *     responses:
 *       201:
 *         description: Admin account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string }
 *                 userId: { type: integer }
 *       400:
 *         description: Validation error or email already used
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Admin already exists — endpoint locked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/setup-master", AdminController.registerAdmin);

const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.use(authenticateToken);
router.use(isAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative user management (admin only)
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: List all users
 *     description: Returns every registered user with profile fields.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
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
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: No token provided
 *       403:
 *         description: Not an admin
 *       500:
 *         description: Server error
 */
router.get("/users", AdminController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided
 *       403:
 *         description: Not an admin
 */
router.get("/users/:id", AdminController.getUserById);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   patch:
 *     summary: Update a user partially
 *     description: |
 *       Updates any field(s) on a user. If `password` is provided,
 *       it will be automatically hashed with bcrypt before storage.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstname:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, recruiter, admin]
 *               company:
 *                 type: string
 *               siret:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: No data provided
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided
 *       403:
 *         description: Not an admin
 *       500:
 *         description: Server error
 */
router.patch("/users/:id", AdminController.updateUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: |
 *       Deletes a user by ID. **Self-deletion is blocked** —
 *       an admin cannot delete their own account.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Attempted self-deletion
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided
 *       403:
 *         description: Not an admin
 *       500:
 *         description: Server error
 */
router.delete("/users/:id", AdminController.deleteUser);

module.exports = router;
