
console.log("before")

setImmediate((arg, arg1, arg2) => {
    console.log("\nexecuting immediate\n" + arg + arg1 + arg2)
}, 'abc', 'def', 'ghi')

console.log("after")