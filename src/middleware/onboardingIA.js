const ia = require('../services/ia');

// Middleware para onboarding IA
async function onboardingIA(req, res, next) {
  if (req.session && req.session.userId && !req.session.onboarded) {
    // Mensagem personalizada de boas-vindas
    const nome = req.session.userNome || 'amigo(a)';
    const perfil = req.session.userPerfil || 'aluno';
    const prompt = `Dê boas-vindas a um novo usuário chamado ${nome}, perfil ${perfil}, explique como usar o QuiShow e incentive a explorar experimentos e a comunidade. Seja motivacional, divertido e breve.`;
    try {
      const mensagemIA = await ia.explicarExperimentoGemini(prompt);
      req.session.onboarded = true;
      res.locals.onboardingIA = mensagemIA;
    } catch {
      res.locals.onboardingIA = null;
    }
  }
  next();
}

module.exports = onboardingIA;
