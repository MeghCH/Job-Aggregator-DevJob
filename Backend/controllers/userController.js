const pool = require('../config/db');



const UserController = {
    async getAllUsers(req, res) {
        try {
            const[users] = await pool.query('SELECT firstname, name, email FROM users');
            return res.status(200).json({
            success: true,
            count: users.length,
            data: users
});

        } catch (error) {
            console.error('Get users error:', error);
        return res.status(500).json({
        success: false,
        message: 'Error fetching users'
});

        }
    }
};

module.exports = UserController;