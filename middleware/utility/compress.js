const zlib = require('zlib')
const fs = require('fs')
const path = require('path')
// const { createReadStream } = require('fs')

const compressFile = (path)=>{
    const input = fs.createReadStream(path)
    const output = fs.createWriteStream(`${path}.gz`)

    input.pipe(zlib.createGzip()).pipe(output)
}
const decompressFile = (path)=>{
    const newPath = `${path.split('.')[0]}_comp.${path.split('.')[1]}`
    const input = fs.createReadStream(path)
    const output = fs.createWriteStream(newPath)

    input.pipe(zlib.createGunzip()).pipe(output)
}

// const pathFile = path.join(__dirname,'../../','files','jp.png')
// console.log(pathFile)
// // compressFile(pathFile)
// decompressFile(`${pathFile}.gz`)

module.exports={compressFile,decompressFile}