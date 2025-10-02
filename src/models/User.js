const pool = require('../config/db');

const User = {

  async create({ nome, email, senha, perfil }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)',
      [nome, email, senha, perfil]
    );
    return result.insertId;
  },

  async listAll() {
    const [rows] = await pool.query(
      'SELECT id, nome, email, perfil, criado_em FROM usuarios ORDER BY criado_em DESC'
    );
    return rows;
  },

  async update({ id, nome, email, perfil }) {
    await pool.query(
      'UPDATE usuarios SET nome=?, email=?, perfil=? WHERE id=?',
      [nome, email, perfil, id]
    );
  },

  async promoteToProfessor(id) {
    await pool.query(
      'UPDATE usuarios SET perfil="professor" WHERE id=?',
      [id]
    );
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM usuarios WHERE id=?',
      [id]
    );
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  }
};

module.exports = User;
