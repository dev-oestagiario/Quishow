const Experimento = require('../models/Experimento');

const ExperimentoController = {
  // Listar todos (admin)
  async listAll(req, res) {
    // Listar todos, inclusive não aprovados, para admin
    const [rows] = await require('../config/db').query('SELECT * FROM experimentos ORDER BY criado_em DESC');
    res.render('admin-experimentos', { experimentos: rows });
  },

  // Detalhe (público)
  async detail(req, res) {
    const exp = await Experimento.findById(req.params.id);
    if (!exp) return res.status(404).send('Experimento não encontrado');
    res.render('experimento-detalhe', { exp });
  },

  // Form de edição (admin)
  async editForm(req, res) {
    const exp = await Experimento.findById(req.params.id, { incluirNaoAprovado: true });
    if (!exp) return res.status(404).send('Experimento não encontrado');
    res.render('experimento-editar', { exp });
  },

  // Atualizar experimento (admin)
  async update(req, res) {
    const { titulo, resumo, imagem, nivel, tema, materiais, passos, video } = req.body;
    await Experimento.update({
      id: req.params.id,
      titulo, resumo, imagem, nivel, tema, materiais, passos, video
    });
    res.redirect('/admin/experimentos');
  },

  // Aprovar experimento (admin)
  async aprovar(req, res) {
    await Experimento.aprovar(req.params.id);
    res.redirect('/admin/experimentos');
  },

  // Deletar experimento (admin)
  async delete(req, res) {
    await Experimento.delete(req.params.id);
    res.redirect('/admin/experimentos');
  }
};

module.exports = ExperimentoController;
