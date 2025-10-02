-- Tabela de likes em experimentos
CREATE TABLE IF NOT EXISTS experimentos_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  experimento_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (usuario_id, experimento_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (experimento_id) REFERENCES experimentos(id) ON DELETE CASCADE
);

-- Tabela de comentários em experimentos
CREATE TABLE IF NOT EXISTS experimentos_comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  experimento_id INT NOT NULL,
  texto TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (experimento_id) REFERENCES experimentos(id) ON DELETE CASCADE
);
