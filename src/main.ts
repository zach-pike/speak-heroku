//path and req res types
import { Request, Response } from "express";
import * as path from "path";

//ws lib
import * as WebSocket from "ws"

//connect to my computer
const ws = new WebSocket(process.env.IPADDR || "ws://127.0.0.1:8085")

//express
import * as express from "express";
import * as socketio from "socket.io";


//import banned words
import * as banned from "./bannedWords.json"

//useragent parser
import * as usragent from "useragent";

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

app.get("/iframe", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/iframe.html"))
})

io.on("connection", (socket: socketio.Socket) => {

    socket.on("texttosay", (data: string) => {

        if (data.length < 2500 + 30 && !banned.includes(data)) {

            console.log(usragent.parse(socket.request.headers['user-agent']))

            ws.send(data)
            io.emit("messageshown", data)

        } 

    })

})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})