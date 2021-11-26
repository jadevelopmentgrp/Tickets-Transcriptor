/*
 * Copyright (c) 2020 Cynthia K. Rey
 * Licensed under the Open Software License version 3.0
 */

const ejs = require('ejs')
const { minify } = require('html-minifier')

const markdown = require('./src/markdown')
const Formatter = require('./src/formatter')

// Stuff
const assets = require('./src/assets')
const testData = require('./example')

let port = process.env.PORT || 8080;

require('http')
  .createServer((req, res) => {
    if (![ 'GET', 'POST' ].includes(req.method)) {
      res.writeHead(405)
      return res.end()
    }

    // Serve
    const handler = async (data) => {
      const fm = new Formatter(data)
      const formatted = await fm.format()
      if (!formatted) {
        res.writeHead(400)
        return res.end()
      }

      ejs.renderFile('./views/index.ejs', {
        data: formatted,
        assets,
        markdown
      }, null, (err, str) => {
        if (err) {
          res.writeHead(500)
          res.end('Internal Server Error')
          console.error(err)
        }
        res.end(minify(str, {
          collapseWhitespace: true,
          removeComments: true
        }))
      })
    }

    res.setHeader('content-type', 'text/html')
    if (req.method === 'POST') {
      let data = ''
      req.on('data', chunk => (data += chunk))
      req.on('end', () => handler(JSON.parse(data)))
    } else {
      return handler(testData)
    }
  }).listen(port)
