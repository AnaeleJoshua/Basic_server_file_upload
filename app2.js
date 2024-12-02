const http = require('http')
const fs = require('fs')
const file = './Node JS_Streams_Intro.mp4'

http.createServer((req,res)=>{
    res.writeHeader('200',{'Content-Type':'video/mp4'})
    fs.createReadStream(file)
    .pipe(res).on('error',console.error)
}).listen(3000,()=>console.log('stream - http://localhost:3000'))
