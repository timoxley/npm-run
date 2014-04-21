# npm-exec

### Run locally-installed executables.

Any executable available to an npm lifecycle script is available to
`npm-exec`.

## Installation

```bash
> npm install -g npm-exec
```

## Usage

```bash
> npm install mocha
> npm-exec mocha test/*
# uses local mocha executable, rather than global
```

### See Also

* [npm-which](https://github.com/timoxley/npm-which)
* [npm-path](https://github.com/timoxley/npm-path)

## License

MIT
