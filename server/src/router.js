const router = require('express').Router();
const productController = require('./controller');
const {
  checkCache_productList,
  checkCache_productInfo,
  checkCache_productStyles,
  checkCache_relatedProducts,
} = require('./middleware');

// Returns list of products
router.get(
  '/products/list',
  checkCache_productList,
  productController.getAllProducts
);

// Returns all product information for specified product id
router.get(
  '/products/:product_id',
  checkCache_productInfo,
  productController.getProductInfo
);

// Returns all styles available for given product
router.get(
  '/products/:product_id/styles',
  checkCache_productStyles,
  productController.getProductStyles
);

// Returns id's of products related to product specified
router.get(
  '/products/:product_id/related',
  checkCache_relatedProducts,
  productController.getRelatedProducts
);

// Loader.io verification
router.get('/loaderio-ce3d8e174b667bbfe7aa6999a2d325c4', function (req, res) {
  const file = `${__dirname}/../loaderio-ce3d8e174b667bbfe7aa6999a2d325c4.txt`;
  res.download(file);
});

module.exports = router;
