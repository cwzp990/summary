const path = require('path')
const fs = require('fs')
const readline = require('readline')

const pathPublic = path.join(__dirname, '/src')

function getFiles (dir, all) {
  all = all || []
  let files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const star = fs.statSync(filePath)
    if (star.isDirectory()) {
      getFiles(filePath, all)
    } else {
      all.push(filePath)
    }
  })
  return all
}

function findChinese (filePath) {
  const extname = path.extname(filePath)
  if (extname === '.html') {
    // do somethings
    readFile(filePath)
  }
  if (extname === '.js' || extname === '.ts') {
    // do somethings
  }
  if (extname === '.vue') {
    // do somethings
  }
}

function readFile (filePath, cb) {
  // 逐行读取汉字
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  })
  rl.on('line', line => {
    // do somethins
    cb && cb(line)
  })
}

function isChineseChar (str) {

}

function createFiles (filePath) {
  // 先读取后写入
  const zhPath = path.join(__dirname, '/src/lang/zh.js')
  fs.readFile(zhPath, 'utf8', (err, data) => {
    if (err) throw err

  })
  fs.writeFile(filePath, data, 'utf8', err => {
    if (err) throw err
  })
}

// 获取文件路径
let allPath = getFiles(pathPublic)

// 根据路径查找汉字
allPath.forEach(path => {
  findChinese(path)
})
