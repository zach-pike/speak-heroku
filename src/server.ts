//path and req res types
import { Request, Response } from "express";
import * as path from "path";

//ws lib
import * as WebSocket from "ws"

//express
import * as express from "express";
import * as socketio from "socket.io";

//import banned words
import * as banned from "./bannedWords.json"

//useragent parser
import * as usragent from "useragent";

//chalk
import * as chalk from "chalk";



//connect to my computer
const ws = new WebSocket(process.env.IPADDR || "ws://127.0.0.1:8085")

//chat codeword
const codeword = process.env.OWNERSECRET || "owner"

//server port
const port = parseInt(process.env.PORT) || 80

const ownerName = "Zach (owner)"

//express setup
const app = express();
app.set("port", port);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);


//START ROUTES
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/mainjs", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/script.js"))
})

app.get("/iframe", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/iframe.html"))
})

app.get("/im", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/chat.html"))
})
//END ROUTES


io.on("connection", (socket: socketio.Socket) => {

    socket.on("texttosay", (data: string) => {

        if (data.length < 2500 + 30 && !banned.includes(data)) {

            if (usragent.parse(socket.request.headers['user-agent']).family != "Other") {
                ws.send(data)
                io.emit("messageshown", data)

                console.log(chalk.green.bold(`TTS message: ${data}`))
            }
        } 
    })

    socket.on("chat", (data: { text: string, codeWord: string }) => {
        if (data.text.length < 250+1) {
            console.log(chalk.red.bold(`Chat message from ${(data.codeWord != codeword ? ownerName : "Anon")}`))
            io.emit("chat", { "text": data.text, "who": (data.codeWord != codeword ? `<b>${ownerName}</b>` : "Anon") })
        }
    })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})