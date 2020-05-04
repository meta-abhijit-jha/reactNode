const fs = require('fs');
const util = require('util')
const read = util.promisify(fs.readFile)
read('./example', 'utf8')
    .then((text) => {
        console.log(text)
    }).catch((err) => {
        console.log('Error', err)
    })
