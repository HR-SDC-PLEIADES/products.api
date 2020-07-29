const redis = require('redis');
const PORT_REDIS = process.env.PORT || 6379;
const redis_client = redis.createClient(PORT_REDIS);

module.exports = {
  checkCache_productList: function (req, res, next) {
    // '0' = key for default product list request
    redis_client.get('0', (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      if (data !== null) {
        // console.log('This is cached data!');
        res.status(200).send(data);
      } else {
        next();
      }
    });
  },
  checkCache_productInfo: function (req, res, next) {
    let id = 'product ' + req.params.product_id;
    redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      if (data !== null) {
        // console.log('This is cached data!');
        res.status(200).send(data);
      } else {
        next();
      }
    });
  },
  checkCache_productStyles: function (req, res, next) {
    let id = 'styles ' + req.params.product_id;
    redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      if (data !== null) {
        // console.log('This is cached data!');
        res.status(200).send(data);
      } else {
        next();
      }
    });
  },
  checkCache_relatedProducts: function (req, res, next) {
    let id = 'related ' + req.params.product_id;
    redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      if (data !== null) {
        // console.log('This is cached data!');
        res.status(200).send(data);
      } else {
        next();
      }
    });
  },
};
