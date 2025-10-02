require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Função para dropar e criar tabelas essenciais
async function initDatabase() {
  // Atenção: isso apaga TODOS os dados!
  const drop = [
    'DROP TABLE IF EXISTS comentarios',
    'DROP TABLE IF EXISTS likes',
    'DROP TABLE IF EXISTS experimentos',
    'DROP TABLE IF EXISTS usuarios'
  ];
  const create = [
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      perfil ENUM('aluno','professor') NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS experimentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(200) NOT NULL,
      resumo TEXT NOT NULL,
      imagem VARCHAR(255),
      nivel ENUM('iniciante','intermediario','avancado') NOT NULL,
      tema VARCHAR(100),
      materiais TEXT,
      passos TEXT,
      video VARCHAR(255),
      aprovado BOOLEAN DEFAULT 0,
      autor_id INT,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL
    )`,
    `CREATE TABLE IF NOT EXISTS likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT,
      experimento_id INT,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_like (usuario_id, experimento_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (experimento_id) REFERENCES experimentos(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS comentarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT,
      experimento_id INT,
      texto TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (experimento_id) REFERENCES experimentos(id) ON DELETE CASCADE
    )`
  ];
  const conn = await pool.getConnection();
  try {
    for (const sql of drop) await conn.query(sql);
    for (const sql of create) await conn.query(sql);
    console.log('Banco de dados inicializado com sucesso!');
  } finally {
    conn.release();
  }
}

module.exports = pool;
module.exports.initDatabase = initDatabase;
