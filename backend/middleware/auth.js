const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    // Get user from database
    const [users] = await pool.execute(
      'SELECT id, username, email, user_type, is_active FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0 || !users[0].is_active) {
      return res.status(401).json({ success: false, message: 'Invalid or inactive user' });
    }

    req.user = users[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ success: false, message: 'Token expired' });
    }
    return res.status(500).json({ success: false, message: 'Authentication error', error: error.message });
  }
};

// Check if user has specific role
const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      // Get user roles
      const [roles] = await pool.execute(
        'SELECT role FROM user_roles WHERE user_id = ? AND is_active = TRUE',
        [req.user.id]
      );

      const userRoles = roles.map(r => r.role);
      
      // Check if user type matches or has required role
      if (allowedRoles.includes(req.user.user_type) || 
          userRoles.some(role => allowedRoles.includes(role))) {
        req.userRoles = userRoles;
        next();
      } else {
        return res.status(403).json({ success: false, message: 'Insufficient permissions' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Authorization error', error: error.message });
    }
  };
};

module.exports = { authenticateToken, requireRole };

