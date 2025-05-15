export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'No autenticado' });
}

export function isAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'No autorizado - solo admin' });
}

export function isPremium(req, res, next) {
  if (req.session?.user?.role === 'premium') {
    return next();
  }
  return res.status(403).json({ error: 'No autorizado - solo premium' });
}
