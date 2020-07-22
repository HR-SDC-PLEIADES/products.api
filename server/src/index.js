const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
