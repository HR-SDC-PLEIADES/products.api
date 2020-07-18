const pool = require('./pg');
const Cursor = require('pg-cursor');

module.exports = {
  getAllProducts: async function (req, res) {
    try {
      const client = await pool.connect();
      const queryStr = 'SELECT * FROM product';
      const cursor = await client.query(new Cursor(queryStr));

      cursor.read(10, (err, rows) => {
        console.log('we got the first 10 rows');
        console.log(rows);
        res.status(200).json(rows);
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  getProductInfo: async function (req, res) {
    let productId = req.params.product_id;
    try {
      const client = await pool.connect();
      const queryStr = `SELECT distinct * FROM product WHERE id=${productId}`;
      const data = client.query(queryStr);
      const featureQueryStr = `SELECT feature, value FROM features WHERE productid=${productId}`;
      const featureData = client.query(featureQueryStr);
      const promises = await Promise.all([data, featureData]);
      const [product, features] = promises;
      if (product.rowCount > 0) {
        const productInfo = product.rows[0];
        productInfo.features = features.rows;
        res.status(200).json(productInfo);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  // FIXME:
  getProductStyles: async function (req, res) {
    let productId = req.params.product_id;
    let returnObj = {
      product_id: productId,
    };
    try {
      const client = await pool.connect();
      const queryStr = `SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE productid=${productId}`;
      const data = await client.query(queryStr);
      let allStyles = data.rows;
      for (let i = 0; i < allStyles.length; i++) {
        const skusQueryStr = `SELECT size, quantity FROM skus WHERE styleId=${allStyles[i].style_id}`;
        const skusData = await client.query(skusQueryStr);
        allStyles[i].skus = skusData.rows;
      }
      returnObj.results = allStyles;
      res.status(200).json(returnObj);
    } catch (err) {
      console.log(err);
    }
  },

  getRelatedProducts: async function (req, res) {
    let productId = req.params.product_id;
    try {
      const client = await pool.connect();
      const queryStr = `SELECT related_product_id FROM related_products WHERE current_product_id=${productId}`;
      const data = await client.query(queryStr);
      let idObjects = data.rows;
      let ids = idObjects.map((idObject) => {
        return idObject.related_product_id;
      });
      res.status(200).json(ids);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
