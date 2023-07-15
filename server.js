require("dotenv").config()
const app = require('./App/app')
const http = require('http')
const dbConnect = require('./Config/dbConnect')

const PORT = process.env.PORT || 3030

const server = http.createServer(app)

server.listen(PORT, console.log(`server is listening on port ${PORT}`))