// express
const express = require('express')
const app = express()

let webpack = require('webpack')
let middle = require('webpack-dev-middleware') // 中间件
let config = require('./webpack.config.js')
let compiler = webpack(config)
app.use(middle(compiler))

app.get('/api/user', (req, res) => {
  res.send({ status: 1, msg: 'success', data: { name: 'webpack', desc: 'webpack is very good' } })
})
app.get('/user', (req, res) => {
  res.send({ status: 1, msg: 'success', data: { name: 'user', desc: 'user is very good' } })
})

app.listen(3000)