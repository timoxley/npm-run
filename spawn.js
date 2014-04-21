"use strict"

var npmPath = require('npm-path')
var spawn = require('child_process').spawn
var args = process.argv.slice(2)
args = args.map(function(arg) {
  try {
    return JSON.parse(arg)
  } catch(e) {
    return arg
  }
})

var options = {}

args = args.map(function(arg) {
  if (arg.toString() !== '[object Object]') return arg
  options = arg
  return arg
})

npmPath.set({cwd: options.cwd, env: process.env}, function(err) {
  options.stdio = 'inherit'
  spawn.apply(null, args)
  .on('close', function(code) {
    process.exit(code)
  })
})
