const pool = require('../config/db');

const Experimento = {
  async create({ titulo, resumo, imagem, nivel, tema, materiais, passos, video, autor_id }) {
    const [result] = await pool.query(
      `INSERT INTO experimentos (titulo, resumo, imagem, nivel, tema, materiais, passos, video, autor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, resumo, imagem, nivel, tema, materiais, passos, video, autor_id]
    );
    return result.insertId;
  },


  async listAllAprovados() {
    const [rows] = await pool.query(
      `SELECT * FROM experimentos WHERE aprovado = 1 ORDER BY criado_em DESC`
    );
    return rows;
  },

  async listAprovadosFiltrado(nivel, tema) {
    let sql = 'SELECT * FROM experimentos WHERE aprovado = 1';
    const params = [];
    if (nivel) {
      sql += ' AND nivel = ?';
      params.push(nivel);
    }
    if (tema) {
      sql += ' AND tema LIKE ?';
      params.push(`%${tema}%`);
    }
    sql += ' ORDER BY criado_em DESC';
    const [rows] = await pool.query(sql, params);
    return rows;
  },


  async findById(id, { incluirNaoAprovado = false } = {}) {
    const [rows] = await pool.query(
      incluirNaoAprovado
        ? `SELECT * FROM experimentos WHERE id = ?`
        : `SELECT * FROM experimentos WHERE id = ? AND aprovado = 1`,
      [id]
    );
    return rows[0];
  },

  async update({ id, titulo, resumo, imagem, nivel, tema, materiais, passos, video }) {
    await pool.query(
      `UPDATE experimentos SET titulo=?, resumo=?, imagem=?, nivel=?, tema=?, materiais=?, passos=?, video=? WHERE id=?`,
      [titulo, resumo, imagem, nivel, tema, materiais, passos, video, id]
    );
  },

  async delete(id) {
    await pool.query(
      `DELETE FROM experimentos WHERE id=?`,
      [id]
    );
  },

  async aprovar(id) {
    await pool.query(
      `UPDATE experimentos SET aprovado=1 WHERE id=?`,
      [id]
    );
  },

  async listByAutor(autor_id) {
    const [rows] = await pool.query(
      `SELECT * FROM experimentos WHERE autor_id = ? ORDER BY criado_em DESC`,
      [autor_id]
    );
    return rows;
  }
};

module.exports = Experimento;
