const pool = require('./pg');
const Cursor = require('pg-cursor');

module.exports = {
  getAllProductsModel: async function (callback) {
    try {
      const client = await pool.connect();
      const queryStr = 'SELECT * FROM product';
      const cursor = await client.query(new Cursor(queryStr));
      return cursor.read(10, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getProductInfoModel: async function (productId, callback) {
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
        callback(null, productInfo);
      } else {
        callback(err, null);
      }
    } catch (err) {
      console.log(err);
    }
  },

  // FIXME:
  getProductStylesModel: async function (productId, callback) {
    let returnObj = {
      product_id: productId,
    };
    try {
      const client = await pool.connect();
      const queryStr = `SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE productid=${productId}`;
      const data = await client.query(queryStr);
      let allStyles = data.rows;
      let skusInfo;
      for (let i = 0; i < allStyles.length; i++) {
        const skusQueryStr = `SELECT size, quantity FROM skus WHERE styleId=${allStyles[i].style_id}`;
        const skusData = await client.query(skusQueryStr);
        let skusInfo = skusData.rows;
        console.log('skusInfo', skusInfo);
        let skusObject = {};
        let skusInfoTransformed = skusInfo.map((each) => {
          skusObject[each.size] = each.quantity;
        });
        allStyles[i].skus = skusObject;
      }
      returnObj.results = allStyles;
      callback(null, returnObj);
    } catch (err) {
      console.log(err);
    }
  },

  getRelatedProductsModel: async function (productId, callback) {
    try {
      const client = await pool.connect();
      const queryStr = `SELECT related_product_id FROM related_products WHERE current_product_id=${productId}`;
      const data = await client.query(queryStr);
      let idObjects = data.rows;
      let ids = idObjects.map((idObject) => {
        return idObject.related_product_id;
      });
      callback(null, ids);
    } catch (err) {
      console.log(err);
    }
  },
};
