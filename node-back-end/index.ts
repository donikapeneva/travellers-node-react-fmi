import {Server} from './src/server';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const port = 3030;
const server = new Server(app);

server.start(port);
