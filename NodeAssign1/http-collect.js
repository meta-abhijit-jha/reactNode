'use-strict'
const http = require('http')
var bl = require('bl') //buffer list
var totalData = ""
var countChar = 0
http.get(process.argv[2], function callback(response) {
    response.pipe(bl(function (err, data) {
        if(err) {
            return console.log(err)
        }
        totalData = totalData.concat(data.toString())
        console.log(totalData.length)
        console.log(totalData)
    }))
})

