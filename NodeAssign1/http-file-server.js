//argv[2] for port
//argv[3] for file location
'use-strict'
const fs = require('fs')
const http = require('http')
const server = http.createServer(function (request, response) {
    var readStream = fs.createReadStream(process.argv[3])
    readStream.on('open',function () {
        readStream.pipe(response)
    })

    readStream.on('error', function(err) {
        response.end(err)
    })
})
server.listen(process.argv[2])