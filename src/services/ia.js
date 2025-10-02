const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function explicarExperimentoGemini(pergunta) {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { parts: [ { text: `Explique de forma simples, divertida e prática para alunos do ensino médio: ${pergunta}` } ] }
        ]
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (err) {
    return 'Desculpe, a IA está indisponível no momento.';
  }
}

module.exports = { explicarExperimentoGemini };
