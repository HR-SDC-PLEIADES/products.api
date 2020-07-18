const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
