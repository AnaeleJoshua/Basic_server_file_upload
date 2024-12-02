const express = require('express')
const fileUpload = require('express-fileupload')
const {compressFile} = require('./middleware/utility/compress')
const path = require('path')
const cors = require('cors')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const filePayloadExists= require('./middleware/filePayloadExists')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')
const PORT = process.env.PORT || 3500;

const app = express()
app.use(cors())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/upload',
//filePayloadExists,
fileUpload({createParentPath:true}),
filePayloadExists,
fileExtLimiter(['.png','.jpg','.jpeg']),
fileSizeLimiter, 
(req,res) => {
    const files = req.files
    // console.log(files)
     Object.keys(files).forEach(key=>{
        const filePath = path.join(__dirname,'files',files[key].name)
        compressFile(filePath)
        files[key].mv(filePath,(err)=>{
            if(err)return res.status(500).json({status:"error",message:err})
        })
     })
    return res.json({status: 'success',message:Object.keys(files).toString()})
}
)

app.get('/download/:fileName',(req,res)=>{
    file = req.params
    console.log(file)
    let filepath = path.join(__dirname,'files',`${file.fileName}.png`)
    console.log(filepath)
    if(!filepath){
         filepath = path.join(__dirname,'files',`${file.fileName}.jpg`)
    }
    console.log(filepath)
    return res.status(200).download(filepath)
})
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})