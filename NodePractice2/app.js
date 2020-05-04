const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(function (request, response) {
    response.statusCode = 200
    response.setHeader = ('Content-Type', 'text/plain')
    response.end("Hello")
})

server.listen(port, hostname, function(){
    console.log("Server is running at http://${hostname}:${port}/")
})