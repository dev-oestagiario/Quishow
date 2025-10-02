
const User = require('../models/User');

const UserController = {

  // Listar todos os usuários (admin)
  async listAll(req, res) {
    const usuarios = await User.listAll();
    res.render('usuarios', { usuarios });
  },

  // Editar usuário (admin)

  async editForm(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado');
    res.render('usuario-editar', { user });
  },


  async update(req, res) {
    const { nome, email, perfil } = req.body;
    await User.update({ id: req.params.id, nome, email, perfil });
    res.redirect('/admin/usuarios');
  },


  // Promover para professor (admin)
  async promote(req, res) {
    await User.promoteToProfessor(req.params.id);
    res.redirect('/admin/usuarios');
  },


  // Banir usuário (admin)
  async ban(req, res) {
    await User.delete(req.params.id);
    res.redirect('/admin/usuarios');
  }
};

module.exports = UserController;
