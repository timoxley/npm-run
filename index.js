'use strict'

var npmPath = require('npm-path')
var childProcess = require('child_process')

var exec = childProcess.exec
var spawn = childProcess.spawn
var spawnSync = childProcess.spawnSync

// polyfill for childProcess.execSync
var execSync = childProcess.execSync

npmExec.spawn = npmSpawn
npmExec.spawnSync = npmSpawnSync
npmExec.sync = npmExecSync

npmExec.exec = npmExec
npmExec.execSync = npmExecSync

module.exports = npmExec

function npmExec (command, options, fn) {
  var a = normalizeExecArgs(command, options, fn)
  command = a[0]
  options = a[1]
  fn = a[2]
  return exec(command, augmentOptionsSync(options), fn)
}

function npmSpawn (command, args, options, fn) {
  var a = normalizeSpawnArgs(command, args, options, fn)
  command = a[0]
  args = a[1]
  options = a[2]
  fn = a[3]
  return spawn(command, args, augmentOptionsSync(options), fn)
}

function npmSpawnSync (command, args, options) {
  var a = normalizeSpawnArgs(command, args, options)
  command = a[0]
  args = a[1]
  options = a[2]
  return spawnSync(command, args, augmentOptionsSync(options))
}

function npmExecSync (command, options) {
  var a = normalizeExecArgs(command, options)
  command = a[0]
  options = a[1]
  return execSync(command, augmentOptionsSync(options))
}

function augmentOptionsSync (options) {
  options = options || {}
  var newPath = npmPath.getSync(options)
  var env = Object.create(options.env)
  env[npmPath.PATH] = newPath
  options.env = env
  return options
}

function normalizeSpawnArgs (file /*, args, options */) {
  var args, options

  if (Array.isArray(arguments[1])) {
    args = arguments[1].slice(0)
    options = arguments[2]
  } else if (arguments[1] !== undefined &&
             (arguments[1] === null || typeof arguments[1] !== 'object')) {
    throw new TypeError('Incorrect value of args option')
  } else {
    args = []
    options = arguments[1]
  }

  if (options === undefined) { options = {} } else if (options === null || typeof options !== 'object') { throw new TypeError('options argument must be an object') }

  return [file, args, options]
}

function normalizeExecArgs (command /*, options, callback */) {
  var options, callback

  if (typeof arguments[1] === 'function') {
    options = undefined
    callback = arguments[1]
  } else {
    options = arguments[1]
    callback = arguments[2]
  }
  callback = callback || noopErr
  return [command, options, callback]
}

function noopErr (err) {
  if (err) throw err
}
