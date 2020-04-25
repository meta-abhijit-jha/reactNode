'use strict'
const fs = require('fs')
const lines
fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) {
        console.log(err)
        return
    } else {
        lines = data.split('\n').length - 1
        console.log(lines)
    }
})
