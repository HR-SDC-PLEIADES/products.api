const express = require('express');
const os = require('os');
const cluster = require('cluster');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const PORT = process.env.PORT || 3030;

const clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log('Worker', worker.id, ' has exitted!');
    });
  } else {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/', router);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT} and worker ${process.pid}`);
    });
  }
} else {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/', router);
  app.listen(PORT, () => {
    console.log(
      `listening on port ${PORT} with the single worker ${process.pid}`
    );
  });
}
