const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @description Auth Controller
 * Handles user registration and login
 */
const AuthController = {
    /**
     * @route POST /api/auth/register
     * @desc Register a new user
     */
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide username, email and password'
                });
            }

            // Check if user exists
            const [existingUsers] = await pool.query(
                'SELECT * FROM users WHERE email = ? OR username = ?',
                [email, username]
            );

            if (existingUsers.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email or username already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const [result] = await pool.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );

            const [newUser] = await pool.query(
                'SELECT id, username, email, created_at FROM users WHERE id = ?',
                [result.insertId]
            );

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: newUser[0]
            });

        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error registering user'
            });
        }
    },

    /**
     * @route POST /api/auth/login
     * @desc Login a user
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide email and password'
                });
            }

            const [users] = await pool.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const user = users[0];

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    username: user.username
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    created_at: user.created_at
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error logging in'
            });
        }
    },

    /**
     * @route GET /api/auth/me
     * @desc Get current authenticated user
     */
    async me(req, res) {
        try {
            const [users] = await pool.query(
                'SELECT id, username, email, created_at FROM users WHERE id = ?',
                [req.user.userId]
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
            console.error('Get user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching user'
            });
        }
    }
};

module.exports = AuthController;
