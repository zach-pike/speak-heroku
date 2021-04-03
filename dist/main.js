"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const WebSocket = require("ws");
const ws = new WebSocket(process.env.IPADDR || "ws://127.0.0.1:8085");
const express = require("express");
const banned = require("./bannedWords.json");
const DOMPurify = require("dompurify");
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
app.get("/iframe", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/iframe.html"));
});
io.on("connection", (socket) => {
    socket.on("texttosay", (data) => {
        if (data.length < 2500 + 30 && !banned.includes(data)) {
            ws.send(data);
            console.log(data);
            io.emit("messageshown", DOMPurify.sanitize(data));
        }
    });
});
http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
