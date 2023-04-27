const path = require('node:path')
const fs = require('node:fs')

const dist = path.resolve(__dirname, '../dist/')
const entry = path.resolve(__dirname, '../index.html')

fs.rmSync(dist, { force: true, recursive: true })
fs.mkdirSync(dist)

// NOTE fs.cp is experimental feature
fs.cpSync(entry, path.resolve(dist, 'index.html'))
fs.cpSync(path.resolve(__dirname, '../posts'), path.resolve(dist, 'posts'), { recursive: true }) 
fs.cpSync(path.resolve(__dirname, '../images'), path.resolve(dist, 'images'), { recursive: true }) 

