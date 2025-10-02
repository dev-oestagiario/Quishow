const pool = require('./src/config/db');

(async () => {
  try {
    const [result] = await pool.query(
      'INSERT INTO comentarios (usuario_id, experimento_id, texto) VALUES (?, ?, ?)',
      [2, 1, 'Comentário teste via script Node.js (usuário 2, experimento 1)']
    );
    console.log('Comentário inserido:', result);
  } catch (err) {
    console.error('Erro ao inserir comentário:', err);
  } finally {
    process.exit(0);
  }
})();
