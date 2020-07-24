"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3030;
const server = new server_1.Server(app);
server.start(port);
//# sourceMappingURL=index.js.map