require("dotenv").config()
const app = require('./App/app')
const http = require('http')
const {
    mongoConnect,
    mongoDisconnect,
  } = require('./Config/dbConnect')

const PORT = process.env.PORT || 1989

const server = http.createServer(app)

async function dbConnect(){
    await mongoConnect()
}

server.listen(PORT, console.log(`server is listening on port ${PORT}`))
dbConnect()



