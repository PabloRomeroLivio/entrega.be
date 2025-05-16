export function isAuthenticated(req, res, next) {
  if (req.session?.user) return next();
  return res.status(401).json({ error: 'No autenticado' });
}

export function isAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') return next();
  return res.status(403).json({ error: 'Solo administradores' });
}

export function isPremium(req, res, next) {
  if (req.session?.user?.role === 'premium') return next();
  return res.status(403).json({ error: 'Solo usuarios premium' });
}

export function ensureAuthenticated(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect('/login'); 
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.session?.user) return res.status(401).json({ error: 'No autenticado' });
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
  };
};
