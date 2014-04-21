# npm-run

### Run locally-installed executables.

Any executable available to an npm lifecycle script is available to
`npm-run`.

## Installation

```bash
> npm install -g npm-run
```

## Usage

```bash
> npm install mocha
> npm-run mocha test/*
# uses local mocha executable, rather than global
```

### See Also

* [npm-which](https://github.com/timoxley/npm-which)
* [npm-path](https://github.com/timoxley/npm-path)

## License

MIT
