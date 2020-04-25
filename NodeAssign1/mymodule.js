'use strict'
const fs = require('fs');
const path = require('path');
var i ;
var filteredArray = [];
module.exports = function (dirName, extension, callback) {
    fs.readdir(dirName, function (err, data) {
        if (err) {
            return callback(err);
        } else {
            for (i = 0; i < data.length; i++) {
                if (path.extname(dirName + '/' + data[i]) == '.' + extension) {
                    filteredArray.push(data[i]);
                }
            }
        }
        callback(null,filteredArray);
    })
}