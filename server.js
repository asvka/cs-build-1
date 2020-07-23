const express = require('express')
const cors = require('cors')
const server = express()
const port = process.env.PORT || 7777

server.use(express.json())
server.use(cors())

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

