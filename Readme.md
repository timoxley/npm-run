# npm-run

[![Build Status](https://travis-ci.org/timoxley/npm-run.svg?branch=master)](https://travis-ci.org/timoxley/npm-run)

### Run local executables from node_modules

Makes it easy to run locally-installed package executables in a robust manner.  Any executable available to an npm lifecycle script is available to `npm-run`.


## Why

Due to npm's install algorithm `node_modules/.bin` is not guaranteed to contain your executable. `npm-run` uses the same mechanism npm uses to locate the correct executable.

## Installation

```bash
> npm install -g npm-run
```

## Usage

```bash
> npm install mocha
> npm-run mocha test/*
# uses local mocha executable
```

### See Also

* [timoxley/npm-which](https://github.com/timoxley/npm-which)
* [timoxley/npm-path](https://github.com/timoxley/npm-path)
* [grncdr/npm-exec](https://github.com/grncdr/npm-exec)

## License

MIT
