const cluster = require("cluster");
const os = require("os");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./route/index");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(helmet());

  app.use("/api/v1", router);

  app.listen(8000, () => {
    console.log("listening on *:8000");
  });
}
