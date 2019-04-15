const express = require('express')
const port = 4002
const server = express()

require('./src/controllers')(server)

server.listen(port, () => console.log(`Server listenning on port ${port}`))