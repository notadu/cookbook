const express = require("express");
const config = require("./config");

const server = express();
// Since the root/dist dir contains our index.html
const root = `${__dirname}/build`;

server.use(express.static(root));

server.get("*", (req, res) => {
  res.sendFile(`${root}/index.html`);
});

server.listen(config.port, () => {
  console.info(`Express is listening on port ${config.port}`);
});
