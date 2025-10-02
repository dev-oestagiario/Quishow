const pool = require('./src/config/db');

(async () => {
  try {
    const [usuarios] = await pool.query('SELECT id, nome FROM usuarios');
    const [experimentos] = await pool.query('SELECT id, titulo FROM experimentos');
    console.log('Usuários:', usuarios);
    console.log('Experimentos:', experimentos);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
  } finally {
    process.exit(0);
  }
})();
