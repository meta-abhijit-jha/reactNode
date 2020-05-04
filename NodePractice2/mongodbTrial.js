var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/EmployeeDB";
// ,
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) {
        return console.log(err)
    }
    console.log('DB Created')
    db.close();
})