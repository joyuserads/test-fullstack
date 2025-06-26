const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./noticias.db');

// Criação da tabela, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS noticias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      subtitulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      imagemUrl TEXT
    )
  `);
});


module.exports = db;
