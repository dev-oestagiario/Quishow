
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'quishowsecret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// View engine - Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    splitLines: function (text) {
      if (!text) return [];
      return text.split(/\r?\n/).filter(Boolean);
    },
    eq: function (a, b) {
      return a === b;
    }
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rotas


const publicRoutes = require('./routes/public');
const experimentosRoutes = require('./routes/experimentos');
const usuariosRoutes = require('./routes/usuarios');

const adminExperimentosRoutes = require('./routes/admin-experimentos');
const adminRoutes = require('./routes/admin');
const planosRoutes = require('./routes/planos');

app.use('/planos', planosRoutes);

app.use('/', publicRoutes);
app.use('/experimentos', experimentosRoutes);


app.use('/admin/usuarios', usuariosRoutes);
// Rota direta para dashboard do usuário (GET /dashboard)
app.get('/dashboard', require('./middleware/requireAuth'), require('./middleware/onboardingIA'), async (req, res) => {
  const user = await require('./models/User').findById(req.session.userId);
  let experimentos = [];
  if (user.perfil === 'aluno') {
    experimentos = await require('./models/Experimento').listAllAprovados();
  } else if (user.perfil === 'professor') {
    experimentos = await require('./models/Experimento').listByAutor(user.id);
  }
  res.render('dashboard', {
    nome: user.nome,
    perfil: user.perfil,
    experimentos,
    onboardingIA: res.locals.onboardingIA
  });
});
app.use('/admin/experimentos', adminExperimentosRoutes);
app.use('/admin/dashboard', adminRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QuiShow rodando em http://localhost:${PORT}`);
});
