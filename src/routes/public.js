
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Cadastro
router.get('/cadastro', AuthController.cadastroForm);
router.post('/cadastro', AuthController.cadastro);

// Login
router.get('/login', AuthController.loginForm);
router.post('/login', AuthController.login);

// Logout
router.get('/logout', AuthController.logout);

// Landing Page
router.get('/', (req, res) => {
  res.render('landing');
});

// Sobre
router.get('/sobre', (req, res) => {
  res.render('sobre');
});

// Blog
router.get('/blog', (req, res) => {
  res.render('blog');
});

// Roadmap
router.get('/roadmap', (req, res) => {
  res.render('roadmap');
});

// Recuperar senha
router.get('/recuperar', (req, res) => {
  res.render('recuperar');
});

module.exports = router;
