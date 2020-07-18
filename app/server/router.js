const router = require('express').Router();
const productController = require('./controller');

// [GET] Retrieves the list of products
router.get('/products/list', productController.getAllProducts);

// [GET] Returns all product level information for a specified product id
router.get('/products/:product_id', productController.getProductInfo);

// [GET] Returns all styles available for the given product
router.get('/products/:product_id/styles', productController.getProductStyles);

// [GET] Returns the id's of products related to the product specified
router.get(
  '/products/:product_id/related',
  productController.getRelatedProducts
);

module.exports = router;
