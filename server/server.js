const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectdb = require('./src/config/connectdb')
const initRouter = require('./src/routers')
const cookieParser = require('cookie-parser')
const helmet = require("helmet");

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
        frameguard: false,
        crossOriginResourcePolicy: false
    })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

initRouter(app)
connectdb()

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server on running the port ${listener.address().port}`)
})
