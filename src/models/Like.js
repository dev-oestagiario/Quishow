const pool = require('../config/db');

const Like = {
  async add(usuario_id, experimento_id) {
    await pool.query(
      'INSERT IGNORE INTO likes (usuario_id, experimento_id) VALUES (?, ?)',
      [usuario_id, experimento_id]
    );
  },
  async remove(usuario_id, experimento_id) {
    await pool.query(
      'DELETE FROM likes WHERE usuario_id = ? AND experimento_id = ?',
      [usuario_id, experimento_id]
    );
  },
  async count(experimento_id) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as total FROM likes WHERE experimento_id = ?',
      [experimento_id]
    );
    return rows[0].total;
  },
  async isLiked(usuario_id, experimento_id) {
    const [rows] = await pool.query(
      'SELECT 1 FROM likes WHERE usuario_id = ? AND experimento_id = ?',
      [usuario_id, experimento_id]
    );
    return rows.length > 0;
  }
};

module.exports = Like;
