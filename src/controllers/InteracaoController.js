const Like = require('../models/Like');
const Comentario = require('../models/Comentario');

const InteracaoController = {
  async like(req, res) {
    if (!req.session.userId) return res.status(401).send('Login necessário');
    await Like.add(req.session.userId, req.params.id);
    res.redirect(`/experimentos/${req.params.id}`);
  },
  async unlike(req, res) {
    if (!req.session.userId) return res.status(401).send('Login necessário');
    await Like.remove(req.session.userId, req.params.id);
    res.redirect(`/experimentos/${req.params.id}`);
  },
  async comentar(req, res) {
    if (!req.session.userId) return res.status(401).send('Login necessário');
    const texto = req.body.texto;
    if (!texto) return res.redirect(`/experimentos/${req.params.id}`);
    await Comentario.add({
      usuario_id: req.session.userId,
      experimento_id: req.params.id,
      texto
    });
    res.redirect(`/experimentos/${req.params.id}`);
  }
};

module.exports = InteracaoController;
