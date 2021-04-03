import { Request, Response } from "express";
import * as path from "path";

import * as WebSocket from "ws"

const ws = new WebSocket(process.env.IPADDR || "ws://127.0.0.1:8085")

import * as express from "express";
import * as socketio from "socket.io";

const port = parseInt(process.env.PORT) || 80

const app = express();
app.set("port", port);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);


app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/mainjs", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/script.js"))
})

io.on("connection", (socket: socketio.Socket) => {
    socket.on("texttosay", (data: string) => {
        ws.send(data)
        console.log(data)
    })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})