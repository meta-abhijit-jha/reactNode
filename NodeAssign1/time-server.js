//input = process.argv[2]
//TCP Time Server
//current date n time followed with "\n"
//after it close the connection
const net = require('net')
var date = new Date()
var month = date.getMonth()+1
if (month < 10) {
    month = "0" + month
}

var finalDate = date.getFullYear() + "-" +
    month + "-" +
    date.getDate() + " " +
    date.getHours() + ":" +
    date.getMinutes() + "\n"
const server = net.createServer(function (socket) {
    socket.write(finalDate)
    socket.end()
}).on('error', function (err) {
    throw error
})
server.listen(process.argv[2])
