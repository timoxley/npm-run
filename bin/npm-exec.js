#!/usr/bin/env node

var pkg = require('../package.json')
var exec = require('child_process').exec
var path = require('path')


var program = require('commander');

program
  .version(pkg.version)
  .parse(process.argv)

var npmExec = require('../')

npmExec.spawn(program.args[0], program.args.slice(1), {stdio: 'inherit'})
.on('close', function(code) {
  process.exit(code)
})
