import express from "express"
import routes from "./routes";
import {urlencoded} from "body-parser"
import cors from "cors";

const PORT = process.env.SERVER_PORT

const app = express()

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

app.listen(PORT, (): void => {
    console.log(`SERVER IS RUNNING IN PORT: ${PORT}`)
})
