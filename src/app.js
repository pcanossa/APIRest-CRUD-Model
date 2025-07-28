// Carrega as variáveis de ambiente do .env no início de tudo.
require('dotenv').config();

const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware essencial para que o Express consiga interpretar o corpo (body)
// de requisições enviadas em formato JSON.
app.use(express.json());

// Rota principal para um teste rápido de saúde da API.
app.get('/', (req, res) => {
  res.send('API de Produtos Segura está no ar!');
});

// Middleware que "conecta" nossas rotas de produtos à aplicação.
// Todas as rotas definidas em 'productRoutes' serão prefixadas com '/api/products'.
// Ex: GET '/' vira GET '/api/products'
app.use('/api/products', productRoutes);

// Inicia o servidor na porta especificada.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
