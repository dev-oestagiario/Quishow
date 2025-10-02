const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');
const ExperimentoController = require('../controllers/ExperimentoController');

// Listar todos (admin)
router.get('/', requireAuth, requireAdmin, ExperimentoController.listAll);
// Form editar
router.get('/:id/editar', requireAuth, requireAdmin, ExperimentoController.editForm);
// Atualizar
router.post('/:id/editar', requireAuth, requireAdmin, ExperimentoController.update);
// Aprovar
router.post('/:id/aprovar', requireAuth, requireAdmin, ExperimentoController.aprovar);
// Deletar
router.post('/:id/deletar', requireAuth, requireAdmin, ExperimentoController.delete);

module.exports = router;
