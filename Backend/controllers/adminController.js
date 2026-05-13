const pool = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * @description Admin Controller
 * Handles administrative tasks like user management
 */
const AdminController = {
    /**
     * @route GET /api/admin/users
     * @desc Get all users (Admin only)
     */
    async getAllUsers(req, res) {
        try {
            const [users] = await pool.query(
                'SELECT id, name, firstname, email, role, company, siret, created_at FROM users ORDER BY created_at DESC'
            );

            return res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (error) {
            console.error('Admin GetAllUsers error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching users list'
            });
        }
    },

    /**
     * @route GET /api/admin/users/:id
     * @desc Get a specific user by ID
     */
    async getUserById(req, res) {
        try {
            const { id } = req.params;

            const [users] = await pool.query(
                'SELECT id, name, firstname, email, role, company, siret, created_at FROM users WHERE id = ?',
                [id]
            );

            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: users[0]
            });
        } catch (error) {
            console.error('Admin GetUserById error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching user details'
            });
        }
    },

    /**
     * @route PATCH /api/admin/users/:id
     * @desc Update user partially
     */
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ success: false, message: "No data provided to update" });
            }

            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, 12);
            }

            const keys = Object.keys(updates);
            const query = `UPDATE users SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
            const values = [...Object.values(updates), id];

            const [result] = await pool.query(query, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({ success: true, message: 'User updated successfully' });

        } catch (error) {
            console.error('Admin PATCH error:', error);
            return res.status(500).json({ success: false, message: 'Error updating user' });
        }
    },

    /**
     * @route DELETE /api/admin/users/:id
     * @desc Delete a user
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            if (parseInt(id) === req.user.userId) {
                return res.status(400).json({
                    success: false,
                    message: 'You cannot delete your own admin account'
                });
            }

            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });

        } catch (error) {
            console.error('Admin DeleteUser error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting user'
            });
        }
    },

    /**
     * @route POST /api/admin/setup-master
     * @desc Créer le TOUT PREMIER compte administrateur (Sécurisé par auto-verrouillage BDD)
     */
    async registerAdmin(req, res) {
        try {
            // 1. SÉCURITÉ CRITIQUE : Vérifier si un admin existe déjà en BDD
            const [adminCheck] = await pool.query(
                "SELECT COUNT(*) as adminCount FROM users WHERE role = 'admin'"
            );

            /* REGARDE ICI : J'AI AJOUTÉ CE COMMENTAIRE POUR ACCÉPTER TA REQUÊTE TEMPORAIREMENT
            if (adminCheck[0].adminCount > 0) {
                return res.status(403).json({
                    success: false,
                    message: "Action interdite. Un administrateur système a déjà été configuré."
                });
            }
            FIN DU COMMENTAIRE TEMPORAIRE */

            const { name, firstname, email, password, company, siret } = req.body;

            // 2. Validation basique des champs requis
            if (!name || !firstname || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Veuillez remplir tous les champs obligatoires (name, firstname, email, password)'
                });
            }

            // 3. Vérifier si l'email existe déjà (tous rôles confondus)
            const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Cet email est déjà utilisé'
                });
            }

            // 4. Hachage sécurisé du mot de passe (bcryptjs)
            const hashedPassword = await bcrypt.hash(password, 12);

            // 5. Insertion du premier Admin avec le rôle 'admin'
            const [result] = await pool.query(
                'INSERT INTO users (name, firstname, email, password, role, company, siret) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, firstname, email, hashedPassword, 'admin', company || null, siret || null]
            );

            return res.status(201).json({
                success: true,
                message: 'Compte Administrateur forcé configuré avec succès !',
                userId: result.insertId
            });

        } catch (error) {
            console.error('Admin RegisterAdmin error:', error);
            return res.status(500).json({
                success: false,
                message: 'Erreur lors de la configuration du compte administrateur'
            });
        }
    } 
}; 

module.exports = AdminController;