const EventEmitter = require('events')    //adding package events

class MyEmitter extends EventEmitter { }  //inheriting EventEmitter class

const myEmitter = new MyEmitter()   //creating object
myEmitter.on('event', (a, b) => {           //registering listeners
    setImmediate(() => {
        console.log('async event occurred')
    })
})
myEmitter.emit('event', 'a', 'b')        //to trigger the event