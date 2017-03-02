# npm-run

[![NPM](https://nodei.co/npm/npm-run.png?downloads=true&downloadRank=true)](https://nodei.co/npm-dl/npm-run/)
[![NPM](https://nodei.co/npm-dl/npm-run.png?months=3&height=3&chrome)](https://nodei.co/npm/npm-run/)

[![Build Status](https://travis-ci.org/timoxley/npm-run.svg?branch=master)](https://travis-ci.org/timoxley/npm-run)

### Run executables in node_modules from the command-line

Use `npm-run` to ensure you're using the same version of a package on the command-line and in package.json scripts.

Any executable available to an npm lifecycle script is available to `npm-run`.

## Usage

```bash
> npm install mocha # mocha installed in ./node_modules
> npm-run mocha test/* # uses locally installed mocha executable 
```

```bash
> npm-run --help
Usage: npm-run command [...args]
Options:
  --version  Display version & exit.
  --help     Display this help & exit.

Hint: to print augmented path use:
npm-run node -p process.env.PATH
```

## Installation

```bash
> npm install -g npm-run
```

## Programmatic API

The API of `npm-run` basically wraps core `child_process` methods (exec, spawn, etc) such that locally install package executables will be on the PATH when the command runs.

## npmRun(command[, options], callback)

Alias of npmRun.exec.

## npmRun.exec(command[, options], callback)

Takes same arguments as node's [exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback).

```js
npmRun.exec('mocha --debug-brk --sort', {cwd: __dirname + '/tests'}, function (err, stdout, stderr) {
  // err Error or null if there was no error
  // stdout Buffer|String
  // stderr Buffer|String
})
```

## npmRun.sync(command[, options])

Alias of npmRun.execSync

## npmRun.execSync(command[, options])

Takes same arguments as node's [execSync](https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options).

```js
var stdout = npmRun.execSync(
  'mocha --debug-brk --sort',
  {cwd: __dirname + '/tests'}
)
stdout // command output as Buffer|String
```

## npmRun.spawnSync(command[, args][, options])

Takes same arguments as node's [spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options).

```js
var child = npmRun.spawnSync(
  'mocha',
  '--debug-brk --sort'.split(' '),
  {cwd: __dirname + '/tests'}
)
child.stdout // stdout Buffer|String
child.stderr // stderr Buffer|String
child.status // exit code
```

## npmRun.spawn(command[, args][, options])

Takes same arguments as node's [spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).

```js
var child = npmRun.spawn(
  'mocha',
  '--debug-brk --sort'.split(' '),
  {cwd: __dirname + '/tests'}
)
child.stdout // stdout Stream
child.stderr // stderr Stream
child.on('exit', function (code) {
  code // exit code
})
```

## Why

Due to npm's install algorithm `node_modules/.bin` is not guaranteed to contain your executable. `npm-run` uses the same mechanism npm uses to locate the correct executable.

### See Also

* [timoxley/npm-which](https://github.com/timoxley/npm-which)
* [timoxley/npm-path](https://github.com/timoxley/npm-path)
* [grncdr/npm-exec](https://github.com/grncdr/npm-exec)

## License

MIT
