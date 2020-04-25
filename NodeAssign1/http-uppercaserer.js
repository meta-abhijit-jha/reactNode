'use strict'
const map = require('through2-map')
const http = require('http')
http.createServer(function (request, response) {
    if (request.method == 'POST') {
        request.pipe(map(function (data) {
            return data.toString().toUpperCase()
        })).pipe(response)
    }
}).listen(process.argv[2])

