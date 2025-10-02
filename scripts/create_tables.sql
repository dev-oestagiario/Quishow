-- SQL para criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  perfil ENUM('aluno','professor') NOT NULL DEFAULT 'aluno',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
