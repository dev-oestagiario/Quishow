const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const requireAuth = require('../middleware/requireAuth');
const onboardingIA = require('../middleware/onboardingIA');


// Middleware admin real
const requireAdmin = require('../middleware/requireAdmin');


// Dashboard do usuário (acesso para qualquer logado)
router.get('/dashboard', requireAuth, onboardingIA, async (req, res) => {
  const user = await require('../models/User').findById(req.session.userId);
  let experimentos = [];
  if (user.perfil === 'aluno') {
    experimentos = await require('../models/Experimento').listAllAprovados();
  } else if (user.perfil === 'professor') {
    experimentos = await require('../models/Experimento').listByAutor(user.id);
  }
  res.render('dashboard', {
    nome: user.nome,
    perfil: user.perfil,
    experimentos,
    onboardingIA: res.locals.onboardingIA
  });
});


// Rotas administrativas (apenas admin/professor)
router.get('/', requireAuth, requireAdmin, UserController.listAll);
router.get('/:id/editar', requireAuth, requireAdmin, UserController.editForm);
router.post('/:id/editar', requireAuth, requireAdmin, UserController.update);
router.post('/:id/promover', requireAuth, requireAdmin, UserController.promote);
router.post('/:id/banir', requireAuth, requireAdmin, UserController.ban);

module.exports = router;
