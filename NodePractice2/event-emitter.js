const EventEmitter = require('events')    //adding package events

class MyEmitter extends EventEmitter { }  //inheriting EventEmitter class

const myEmitter = new MyEmitter()   //creating object
myEmitter.on('event', () => {           //registering listeners    
    console.log('an event occurred')
})
myEmitter.emit('event')        //to trigger the event