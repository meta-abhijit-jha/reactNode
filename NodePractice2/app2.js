const http = require('http')
http.createServer(function (request, response) {
    response.writeHead(200)
    response.write("Hello World")
    setTimeout(function () {
        response.write("hello")
        response.end()
    }, 5000)
}).listen(8080)