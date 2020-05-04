const http = require("http")

http.createServer(function (request, response) {
    console.log("server started")
    const { headers, method, url } = request
    let body = []
    request.on('error', function (err) {
        console.error(err)
    }).on('data', function (data) {
        body.push(data)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        response.on('error', function(error) {
            console.error(err)
        })

        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json')
        const responseBody = {headers, method, url, body}
        response.write(JSON.stringify(responseBody))
        response.end("<h1>Bye!!!!</h1>")
    })
}).listen(8090)