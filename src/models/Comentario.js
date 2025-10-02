const pool = require('../config/db');

const Comentario = {
  async add({ usuario_id, experimento_id, texto }) {
    await pool.query(
      'INSERT INTO comentarios (usuario_id, experimento_id, texto) VALUES (?, ?, ?)',
      [usuario_id, experimento_id, texto]
    );
  },
  async listByExperimento(experimento_id) {
    const [rows] = await pool.query(
      `SELECT c.*, u.nome FROM comentarios c JOIN usuarios u ON c.usuario_id = u.id WHERE c.experimento_id = ? ORDER BY c.criado_em DESC`,
      [experimento_id]
    );
    return rows;
  }
};

module.exports = Comentario;
