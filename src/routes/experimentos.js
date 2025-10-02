const express = require('express');
const router = express.Router();
const Experimento = require('../models/Experimento');
const requireAuth = require('../middleware/requireAuth');
const InteracaoController = require('../controllers/InteracaoController');
const ia = require('../services/ia');
const Like = require('../models/Like');
const Comentario = require('../models/Comentario');
// Explicação por IA Gemini
router.post('/:id/explicar', requireAuth, async (req, res) => {
  const exp = await Experimento.findById(req.params.id);
  if (!exp) return res.status(404).send('Experimento não encontrado');
  const pergunta = req.body.pergunta || `Explique o experimento: ${exp.titulo}. ${exp.resumo}`;
  const explicacaoIA = await ia.explicarExperimentoGemini(pergunta);
  let likeCount = 0, liked = false, comentarios = [];
  if (req.session.userId) {
    liked = await Like.isLiked(req.session.userId, exp.id);
  }
  likeCount = await Like.count(exp.id);
  comentarios = await Comentario.listByExperimento(exp.id);
  res.render('experimento-detalhe', { exp, likeCount, liked, comentarios, userId: req.session.userId, explicacaoIA });
});

// Listagem pública de experimentos aprovados
// Listagem pública de experimentos aprovados, com filtros
router.get('/', async (req, res) => {
  const { nivel, tema } = req.query;
  let experimentos;
  if (nivel || tema) {
    experimentos = await Experimento.listAprovadosFiltrado(nivel, tema);
  } else {
    experimentos = await Experimento.listAllAprovados();
  }
  res.render('experimentos', { experimentos, nivel, tema });
});

// Formulário de novo experimento (apenas logado)
router.get('/novo', requireAuth, (req, res) => {
  res.render('novo-experimento');
});

// Criação de experimento (apenas logado)
router.post('/novo', requireAuth, async (req, res) => {
  const { titulo, resumo, imagem, nivel, tema, materiais, passos, video } = req.body;
  if (!titulo || !resumo || !nivel) {
    return res.render('novo-experimento', { error: 'Preencha os campos obrigatórios.' });
  }
  try {
    await Experimento.create({
      titulo,
      resumo,
      imagem,
      nivel,
      tema,
      materiais,
      passos,
      video,
      autor_id: req.session.userId
    });
    res.redirect('/experimentos');
  } catch (err) {
    res.render('novo-experimento', { error: 'Erro ao criar experimento.' });
  }
});


// Like
router.post('/:id/like', requireAuth, InteracaoController.like);
router.post('/:id/unlike', requireAuth, InteracaoController.unlike);

// Comentar
router.post('/:id/comentar', requireAuth, InteracaoController.comentar);

// Detalhes do experimento
router.get('/:id', async (req, res) => {
  const exp = await Experimento.findById(req.params.id);
  if (!exp) return res.status(404).send('Experimento não encontrado');
  let likeCount = 0, liked = false, comentarios = [];
  if (req.session.userId) {
    liked = await Like.isLiked(req.session.userId, exp.id);
  }
  likeCount = await Like.count(exp.id);
  comentarios = await Comentario.listByExperimento(exp.id);
  res.render('experimento-detalhe', { exp, likeCount, liked, comentarios, userId: req.session.userId });
});

module.exports = router;
