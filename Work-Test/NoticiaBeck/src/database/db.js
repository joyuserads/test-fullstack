const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./banco.db");

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

  db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
      )
 
    `);
});

module.exports = db;
