import * as ws from "ws"
import * as say from "say"

const wss = new ws.Server({
    port: 8085
})

wss.on("connection", (socket) => {
    socket.on("message", (data) => {
        say.speak(data.toString())
    })
})