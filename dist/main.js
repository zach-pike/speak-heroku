"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const WebSocket = require("ws");
const ws = new WebSocket(process.env.IPADDR || "ws://127.0.0.1:8085");
const express = require("express");
const port = parseInt(process.env.PORT) || 80;
const app = express();
app.set("port", port);
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/mainjs", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/script.js"));
});
io.on("connection", (socket) => {
    socket.on("texttosay", (data) => {
        ws.send(data);
        console.log(data);
    });
});
http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
