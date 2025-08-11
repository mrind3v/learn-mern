const http = require("http")

const myServer = http.createServer((req,res)=>{
    // default response to a req on port 8000 
    console.log(req.url) 
    res.end("New request received")
})

// cannot directly run the server after creating using createServer
// we need to first run this server on a port in our machine
myServer.listen(8000, ()=>{
    console.log("Server is listening on PORT: 8000") 
})

// also need to make sure this file is running, for the server to be running on a port and
// hence to respond to any request 