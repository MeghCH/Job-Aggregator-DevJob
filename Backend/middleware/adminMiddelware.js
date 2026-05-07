const isAdmin = (req, res) => {
    
    if (req.user && req.user.role === 'admin') {
      
    } else {
        return res.status(403).json({
            success: false,
            message: "Accès refusé. Droits d'administrateur requis."
        });
    }
};

module.exports = isAdmin;