// Importa a biblioteca mysql2, especificamente a versão que suporta Promises para código assíncrono (async/await)
const mysql = require('mysql2/promise');

// Carrega as variáveis de ambiente do arquivo .env para o objeto 'process.env' do Node.js
require('dotenv').config();

// Cria um "pool" de conexões. Em vez de abrir e fechar uma conexão para cada consulta,
// o pool gerencia um conjunto de conexões ativas que podem ser reutilizadas,
// o que é muito mais eficiente.
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Endereço do servidor do banco (lido do .env)
  user: process.env.DB_USER,         // Usuário do banco (lido do .env)
  password: process.env.DB_PASSWORD, // Senha do banco (lido do .env)
  database: process.env.DB_NAME,     // Nome do banco de dados (lido do .env)
  waitForConnections: true,          // Espera por uma conexão se todas estiverem em uso
  connectionLimit: 10,               // Número máximo de conexões no pool
  queueLimit: 0                      // Limite de requisições na fila de espera (0 = ilimitado)
});

// Exporta o pool para que ele possa ser importado e utilizado em outras partes da aplicação, como nos Models.
module.exports = pool;
