const mysql = require('./mysql')
const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, 'sql')

fs.readdir(filePath, (err, files) => {
  if (err) console.warn(err)
  console.log(files)
})