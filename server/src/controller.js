const models = require('./model');
const redis = require('redis');
const PORT_REDIS = process.env.PORT || 6379;
const redis_client = redis.createClient(PORT_REDIS);

module.exports = {
  getAllProducts: function (req, res) {
    let page = req.query.page || 1;
    let count = req.query.count || page * 5;
    models.getAllProductsModel(count, (err, allProducts) => {
      if (err) {
        res.sendStatus(500);
      } else {
        redis_client.setex('0', 1200, JSON.stringify(allProducts));
        res.status(200).json(allProducts);
      }
    });
  },

  getProductInfo: function (req, res) {
    let productId = req.params.product_id;
    models.getProductInfoModel(productId, (err, productInfo) => {
      if (err) {
        res.sendStatus(500);
      } else {
        redis_client.setex(productId, 1200, JSON.stringify(productInfo));
        res.status(200).json(productInfo);
      }
    });
  },

  getProductStyles: function (req, res) {
    let productId = req.params.product_id;
    models.getProductStylesModel(productId, (err, styleObj) => {
      if (err) {
        res.sendStatus(500);
      } else {
        redis_client.setex(productId, 1200, JSON.stringify(styleObj));
        res.status(200).json(styleObj);
      }
    });
  },

  getRelatedProducts: function (req, res) {
    let productId = req.params.product_id;
    models.getRelatedProductsModel(productId, (err, ids) => {
      if (err) {
        res.sendStatus(500);
      } else {
        redis_client.setex(productId, 1200, JSON.stringify(ids));
        res.status(200).json(ids);
      }
    });
  },
};
