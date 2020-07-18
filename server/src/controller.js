const pool = require('./pg');
const Cursor = require('pg-cursor');

module.exports = {
  getAllProducts: function (req, res) {
    async () => {
      const client = await pool.connect();
      const queryStr = 'SELECT * FROM product';
      const cursor = await client.query(new Cursor(query));

      cursor.ready(10, (err, data) => {
        console.log('we got the first 10 rows');
        console.log(data);
        res.status(200).json(data);

        cursor.read(10, (err, data) => {
          console.log('we have the next 10 rows');
          console.log(data);
          res.status(200).json(data);
        });
      });
    };
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

  getProductStyles: function (req, res) {
    let productId = req.params.product_id;
    async () => {
      const client = await pool.connect();
      const queryStr = `SELECT * FROM styles WHERE productid=${productId}`;
      const data = await client.query(queryStr);
      res.status(200).json(data);
    };
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
