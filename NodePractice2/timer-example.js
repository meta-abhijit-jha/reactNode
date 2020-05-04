const http = require("http")

function datez() {
    let date = new Date()
    return date.toTimeString()
}

function serverStart() {
    console.log(datez())
    http.createServer(function (request, response) {
        response.on('error', function (error) {
            console.error(err)
        })
        response.statusCode = 200
        response.end("<h1>" + datez() + "</h1>")
    }).listen(8090)
}

setTimeout(serverStart, 5000)