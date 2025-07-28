// Importa o pool de conexões que acabamos de configurar.
const pool = require('../config/db');

// O objeto 'Product' agrupa todas as funções que acessam a tabela 'produtos'.
const Product = {
  // PONTO CRÍTICO DE SEGURANÇA:
  // Note o uso de `pool.execute(sql, [params])` em todas as funções.
  // Os '?' na string SQL são placeholders. A biblioteca `mysql2` garante que os valores
  // passados no array `[params]` sejam tratados como dados, e não como parte do comando SQL,
  // bloqueando qualquer tentativa de Injeção de SQL.

  create: async (productData) => {
    const { nome, descricao, preco, quantidade_estoque } = productData;
    const sql = 'INSERT INTO produtos (nome, descricao, preco, quantidade_estoque) VALUES (?, ?, ?, ?)';
    // Os dados do usuário são passados em um array separado, garantindo a segurança.
    const [result] = await pool.execute(sql, [nome, descricao, preco, quantidade_estoque]);
    return { id: result.insertId, ...productData };
  },

  findAll: async () => {
    const sql = 'SELECT * FROM produtos';
    const [rows] = await pool.execute(sql);
    return rows;
  },

  findById: async (id) => {
    const sql = 'SELECT * FROM produtos WHERE id = ?';
    // O 'id' (que vem da URL) é passado de forma segura como parâmetro.
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
  },

  update: async (id, productData) => {
    const { nome, descricao, preco, quantidade_estoque } = productData;
    const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ? WHERE id = ?';
    // Todos os valores, incluindo o 'id', são parametrizados.
    await pool.execute(sql, [nome, descricao, preco, quantidade_estoque, id]);
    return { id, ...productData };
  },

  delete: async (id) => {
    const sql = 'DELETE FROM produtos WHERE id = ?';
    // O 'id' para exclusão também é passado de forma segura.
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
  }
};

module.exports = Product;