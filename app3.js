const http = require('http')
const fs = require('fs')
const file = './Node JS_Streams_Intro.mp4'

http.createServer((req,res)=>{
   fs.readFile(file,(err,data)=>{
    if(err){
        console.error(`hmm`, err)
    }
    res.writeHeader(200,{'Content-Type': 'video/mp4'})
    res.end(data)
   })
}).listen(3000,()=>console.log('stream - http://localhost:3000'))
