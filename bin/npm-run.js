#!/usr/bin/env node

'use strict'

var pkg = require('../package.json')
var npmExec = require('../')
var npmWhich = require('npm-which')

var program = require('minimist')(process.argv)

if (program._.length === 2) {
  if (program.version) {
    console.log(pkg.version)
    process.exit()
  }

  if (program.help) {
    displayHelp(pkg.name)
    process.exit()
  } else {
    displayHelp(pkg.name)
    process.exit(1)
  }
}

try {
  npmWhich.sync(process.argv[2], {cwd: process.cwd()})
} catch (err) {
  console.log(err.message)
  process.exit(1)
}

npmExec.spawn(process.argv[2], process.argv.slice(3), {stdio: 'inherit'})
.on('error', function (err) {
  console.error(err.stack)
})
.on('close', function (code) {
  process.exit(code)
})

function displayHelp (name) {
  console.log([
    'Usage: ' + name + ' command [...args]',
    'Options:',
    '  --version  Display version & exit.',
    '  --help     Display this help & exit.',
    '',
    'Hint: to print augmented path use:',
    name + ' node -p process.env.PATH'
  ].join('\n'))
}
