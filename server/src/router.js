const router = require('express').Router();
const productController = require('./controller');
const { checkCache } = require('./middleware');

// Returns list of products
router.get('/products/list', checkCache, productController.getAllProducts);

// Returns all product information for specified product id
router.get(
  '/products/:product_id',
  checkCache,
  productController.getProductInfo
);

// Returns all styles available for given product
router.get(
  '/products/:product_id/styles',
  checkCache,
  productController.getProductStyles
);

// Returns id's of products related to product specified
router.get(
  '/products/:product_id/related',
  checkCache,
  productController.getRelatedProducts
);

// Loader.io verification
router.get('/loaderio-ce3d8e174b667bbfe7aa6999a2d325c4', function (req, res) {
  const file = `${__dirname}/../loaderio-ce3d8e174b667bbfe7aa6999a2d325c4.txt`;
  res.download(file);
});

module.exports = router;
