const path = require('node:path')
const fs = require('node:fs')

const dist = path.resolve(__dirname, '../dist/')
const entry = path.resolve(__dirname, '../index.html')

fs.rmSync(dist, { force: true, recursive: true })
fs.mkdirSync(dist)

fs.copyFileSync(entry, path.resolve(dist, 'index.html'))

