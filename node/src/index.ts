import bodyParser from "body-parser";

const express = require('express')
const cors = require('cors');

const config = require('./setup/config');

const app = express();


app.use(cors({
	origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("\n[v] Setting up TCP connection");
const socket = require("./setup/socket");
socket.connect();

console.log("\n[v] Attempting to load commands");
require("./setup/commands");


console.log("\n[v] Attempting to load routes");
require('./setup/loader').routes(app);

// Setup active listening for connection

const server = app.listen(config.port, () => console.log(`\nListening on port ${config.port}...\n`));

server.setTimeout(0);

function close() {
	server.close();
	socket.destroy();
}

process.on("exit", () => close());
process.on("uncaughtException", () => close());
process.on("SIGTERM", () => close());
process.on("SIGINT", () => close());