const User = require('../models/User');
const bcrypt = require('bcrypt');

const AuthController = {
  // Exibe formulário de cadastro
  cadastroForm(req, res) {
    res.render('cadastro');
  },

  // Realiza cadastro
  async cadastro(req, res) {
    const { nome, email, senha, perfil } = req.body;
    if (!nome || !email || !senha || !perfil) {
      return res.render('cadastro', { error: 'Preencha todos os campos.' });
    }
    try {
      const userExists = await User.findByEmail(email);
      if (userExists) {
        return res.render('cadastro', { error: 'E-mail já cadastrado.' });
      }
      const hash = await bcrypt.hash(senha, 10);
      await User.create({ nome, email, senha: hash, perfil });
      
      res.redirect('/login');
    } catch (err) {
      res.render('cadastro', { error: 'Erro ao cadastrar. Tente novamente.' });
    }
  },

  // Exibe formulário de login
  loginForm(req, res) {
    res.render('login');
  },

  // Realiza login
  async login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.render('login', { error: 'Preencha todos os campos.' });
    }
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.render('login', { error: 'Usuário não encontrado.' });
      }
      const match = await bcrypt.compare(senha, user.senha);
      if (!match) {
        return res.render('login', { error: 'Senha incorreta.' });
      }
      req.session.userId = user.id;
      req.session.userPerfil = user.perfil;
      res.redirect('/dashboard');
    } catch (err) {
      res.render('login', { error: 'Erro ao fazer login.' });
    }
  },

  // Logout
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};

module.exports = AuthController;
