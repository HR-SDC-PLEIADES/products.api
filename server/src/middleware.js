const redis = require('redis');
const PORT_REDIS = process.env.PORT || 6379;
const redis_client = redis.createClient(PORT_REDIS);

module.exports = {
  checkCache: function (req, res, next) {
    // '0' = key for default product list request
    let id = req.params.product_id || '0';
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
