// Middleware para garantir que o usuário é admin
module.exports = function requireAdmin(req, res, next) {
  if (req.session && req.session.userPerfil === 'professor') {
    return next();
  }
  return res.status(403).send('Acesso restrito a administradores.');
};
