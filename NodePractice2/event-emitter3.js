const EventEmitter = require('events')    //adding package events

class MyEmitter extends EventEmitter { }  //inheriting EventEmitter class
const myEmitter = new MyEmitter()   //creating object
//triggering event
myEmitter.on('event', (a) => {               
    console.log('an event occurred' + a)
})

//triggering event once
// myEmitter.once('event', (a) => {         
//     console.log('an event occurred' + a)
// })

myEmitter.emit('event', 1)        //to trigger the event
myEmitter.emit('event', 2)
myEmitter.emit('event', 3)
myEmitter.emit('event', 4)
