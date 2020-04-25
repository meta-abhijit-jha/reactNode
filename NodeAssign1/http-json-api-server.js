//GET request
//path /api/parsetime?iso=2013-08-10T12:10:15.474Z
//response will contain only hour,minute and second
//path /api/unixtime
//response will contain unixtime
//port will be argv[2]

const http = require('http')
const url = require('url')
http.createServer(function (request, response) {
    let urlObj = url.parse(request.url, true),
        pathName = urlObj.pathname,
        startTime = urlObj.query.iso,
        result;
    if (pathName == '/api/unixtime') {
        result = getUnixTimeStamp(startTime)
    } else if (pathName == '/api/parsetime') {
        result = getTimeObj(startTime)
    }
    if (result) {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(result))
    } else {
        response.writeHead(404)
        response.end
    }
}).listen(process.argv[2])

function getUnixTimeStamp(startTime) {
    return {
        unixtime: getTimeStamp(startTime)
    };
}

function getTimeStamp(startTime) {
    return Date.parse(startTime);
}

function getTimeObj(startTime) {
    var date = new Date(getTimeStamp(startTime));
    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    };
}
