#!/usr/bin/env node

var path = require('path')
  , sass = require('node-sass')
  , found = {}

if (!process.argv[2]) {
  console.error('filename required')
  return
}

console.log(process.argv[2])
sass.render({
  file: process.argv[2],
  importer: function (url, file, done) {
    if (found[url]) {
      return done({
        file: found[url]
      })
    }

    try {
      var np = path.relative('./', require.resolve(url.replace('~', '')))
      found[url] = np
      return done({file: np })
    } catch (e) {
      found[url] = url
      return done({file: url})
    }
  }
}, function (err, result) {
  if (err) {
    throw err
  }
  console.log(result.css.toString())
})
