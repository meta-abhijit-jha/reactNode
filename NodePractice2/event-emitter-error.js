const EventEmitter = require('events')    //adding package events

class MyEmitter extends EventEmitter { }  //inheriting EventEmitter class

const myEmitter = new MyEmitter()   //creating object
myEmitter.on('error', () => {           //registering listeners    
    console.log('an error occurred')
})

//emitter.addListener() is same as emitter.on()
//emitter.removeListener() is same as emitter.off()
//emitter.eventNames() returns array consist of events 