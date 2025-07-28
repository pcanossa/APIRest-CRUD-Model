const Product = require('../models/productModel');
const Joi = require('joi');

// Define um "esquema" ou "contrato" para os dados de um produto.
// Esta é nossa primeira camada de defesa: garante que os dados de entrada
// tenham o tipo e o formato corretos antes de prosseguir.
const productSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  descricao: Joi.string().allow(null, ''), // 'allow' permite que seja nulo ou vazio
  preco: Joi.number().positive().required(), // '.positive()' garante que seja um número > 0
  quantidade_estoque: Joi.number().integer().min(0).required() // '.integer()' garante que seja um número inteiro
});

const productController = {
  // Função para criar um produto
  createProduct: async (req, res) => {
    try {
      // 1. Validar o corpo da requisição (req.body) contra o esquema
      const { error, value } = productSchema.validate(req.body);
      if (error) {
        // Se a validação falhar, retorna um erro 400 (Bad Request) com os detalhes.
        // A requisição morre aqui e nunca toca o banco de dados.
        return res.status(400).json({ message: "Dados inválidos", details: error.details });
      }
      // 2. Chamar o Model para criar o produto com os dados já validados ('value')
      const newProduct = await Product.create(value);
      res.status(201).json('Produto criado com sucesso!');
    } catch (err) {
      res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
  },

  // Função para listar todos os produtos
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
  },

  // Função para buscar um produto por ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
  },

  // Função para atualizar um produto
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { error, value } = productSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: "Dados inválidos", details: error.details });
      }

      // Verifica se o produto existe antes de tentar atualizar
      const productExists = await Product.findById(id);
      if (!productExists) {
         return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
      }
      
      await Product.update(id, value);
      res.status(200).json({ id: parseInt(id), ...value });
    } catch (err) {
      res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
  },

  // Função para deletar um produto
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const affectedRows = await Product.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
      }
      // Status 204 (No Content) é a resposta padrão para uma exclusão bem-sucedida.
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
  }
};

module.exports = productController;
