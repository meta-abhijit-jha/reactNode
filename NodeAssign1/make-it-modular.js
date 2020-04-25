const myModule = require('./mymodule.js');
myModule(process.argv[2], process.argv[3], function (err, data) {
    if (err) {
        return console.error('There was an error:', err);
    } else {
        data.forEach(function (item) {
            console.log(item);
        })
    }
})