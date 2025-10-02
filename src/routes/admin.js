const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const User = require('../models/User');
const Experimento = require('../models/Experimento');

// Middleware admin
function requireAdmin(req, res, next) {
  if (req.session.userPerfil !== 'professor') {
    return res.status(403).send('Acesso restrito');
  }
  next();
}

// Dashboard admin: visão geral
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const usuarios = await User.listAll();
  const experimentos = await Experimento.listAllAprovados();
  // KPIs simples
  const totalUsuarios = usuarios.length;
  const totalExperimentos = experimentos.length;
  res.render('admin-dashboard', {
    totalUsuarios,
    totalExperimentos,
    usuarios,
    experimentos
  });
});

module.exports = router;
