"use strict"

var which = require('npm-which')
var npmPath = require('npm-path')
var child_process = require('child_process')

var exec = child_process.exec
var execFile = child_process.execFile
var spawn = child_process.spawn
var fork = child_process.fork
npmExec.spawn = npmSpawn

module.exports = npmExec

function npmExec(args, options, fn) {
  var opts = setOptions(options, fn)
  options = opts[0]
  fn = opts[1]
  getPath(options, function(err, options) {
    if (err) return fn(err)
    exec(args, options, fn)
  })
}

function npmSpawn() {
  var options = {}
  var args = [].slice.apply(arguments)
  args = args.map(function(arg) {
    if (Array.isArray(arg)) return JSON.stringify(arg)
    if (arg.toString() === '[object Object]') {
      options = arg
      return JSON.stringify(arg)
    }
    return arg
  })
  return spawn(process.execPath, [__dirname + '/spawn.js'].concat(args), options)
}

function getPath(options, fn) {
  npmPath.get(options, function(err, newPath) {
    var env = Object.create(options.env)
    env[npmPath.PATH] = newPath
    options.env = env
    fn(null, options)
  })
}

getPath.sync = function getPathSync(options) {
  var newPath = npmPath.getSync(options)
  var env = Object.create(options.env)
  env[npmPath.PATH] = newPath
  options.env = env
  return options
}

function setOptions(options, fn) {
  if (typeof options == 'function') fn = options, options = null
  options = Object.create(options || {})
  options.env = options.env || process.env
  options.cwd = options.cwd || process.cwd()
  return [options, fn]
}
