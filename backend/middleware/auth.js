const jwt = require('jsonwebtoken');

// Verify Token
const verifyToken = (req, res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  const [scheme, token, ...extraParts] = authorization.trim().split(/\s+/);
  if (scheme !== 'Bearer' || !token || extraParts.length > 0) {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Verify Admin Role
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access Denied: Admin privileges required' });
    }
  });
};

module.exports = { verifyToken, verifyAdmin };