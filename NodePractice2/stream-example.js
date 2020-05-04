const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Why should we use streams?",(answer)=>{
    console.log("Maybe it is "+answer+" maybe they are awesome")
    rl.close()
})

