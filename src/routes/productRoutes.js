const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Mapeamento das rotas para as funções do controller:
// Uma requisição POST para '/' (relativo a '/api/products') chama 'createProduct'.
router.post('/', productController.createProduct);

// Uma requisição GET para '/' chama 'getAllProducts'.
router.get('/', productController.getAllProducts);

// Uma requisição GET para '/:id' (ex: /123) chama 'getProductById'.
router.get('/:id', productController.getProductById);

// Uma requisição PUT para '/:id' chama 'updateProduct'.
router.put('/:id', productController.updateProduct);

// Uma requisição DELETE para '/:id' chama 'deleteProduct'.
router.delete('/:id', productController.deleteProduct);

module.exports = router;