import * as ws from "ws"
import * as say from "say"
import * as chalk from "chalk"

const wss = new ws.Server({
    port: 8085
})

wss.on("listening", ()=> {
    console.log(chalk.green("WSS Server open!"))
})

wss.on("connection", (socket) => {
    socket.on("message", (data) => {
        say.speak(data.toString())
    })
})