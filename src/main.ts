import * as express from "express"
import { Request, Response } from "express"

import * as path from "path"

const app = express()

const port = parseInt(process.env.PORT) || 80

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/mainjs", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/script.js"))
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})