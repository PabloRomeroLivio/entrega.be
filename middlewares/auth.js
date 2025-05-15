export function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'No autenticado' });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
  };
}
router.post('/login', async (req, res) => {
  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  res.json({ message: 'Login exitoso' });
});