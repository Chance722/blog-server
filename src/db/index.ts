
const mysql = require('./mysql')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const filePath = path.resolve(__dirname, 'sql')

fileDisplay(filePath)

async function fileDisplay (filePath) {
  let files = []
  try {
    files = await readdir(filePath)
  } catch (err) {
    console.error(`读取目录失败：${err}`)
  }
  files.forEach(async filename => {
    const currentPath = path.join(filePath, filename)
    let statRes = null
    try {
      statRes = await stat(currentPath)
      if (statRes.isFile()) {
        const fileInfo = {
          file: await readFileAsync(currentPath, 'utf8'),
          name: filename
        }
        createTable(fileInfo)
      } else if (statRes.isDirectory()) {
        fileDisplay(currentPath)
      }
    } catch (err) {
      console.error(`获取文件stats失败：${err}`)
    }
  })
}

function createTable (fileInfo) {
  mysql.createTable(fileInfo.file).then(res => {
    console.log(`Create table ${fileInfo.name.replace('.sql','')} successed.`)
  }).catch(err => {
    console.error(`Create table ${fileInfo.name.replace('.sql','')} failed: ${JSON.stringify(err)}`)
  })
}

