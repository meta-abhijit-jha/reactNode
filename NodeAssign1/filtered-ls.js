//first arg. = directory name
//second arg. = extension without dot
'use strict'
const fs = require('fs');
const path = require('path');
let i;
fs.readdir(process.argv[2], function (err, files) {
    if (err) {
        console.log(err);
    } else {
        for (i = 0; i < files.length; i++) {
            if (path.extname(process.argv[2] + '/' + files[i]) == '.' + process.argv[3]) {
                console.log(files[i]);
            }
        }
    }
});



