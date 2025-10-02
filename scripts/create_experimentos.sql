-- SQL para criar tabela de experimentos
CREATE TABLE IF NOT EXISTS experimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  resumo TEXT NOT NULL,
  imagem VARCHAR(255),
  nivel ENUM('iniciante','intermediario','avancado') NOT NULL DEFAULT 'iniciante',
  tema VARCHAR(100),
  materiais TEXT,
  passos TEXT,
  video VARCHAR(255),
  autor_id INT,
  aprovado TINYINT(1) DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);
