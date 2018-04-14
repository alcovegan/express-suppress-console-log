# express-suppress-console-log

[![Build Status](https://travis-ci.org/alcovegan/express-suppress-console-log.svg?branch=master)](https://travis-ci.org/alcovegan/express-suppress-console-log)

Simple lib for suppressing `console.log` outputs in your ExpressJS and other apps based on passed environments rules. Main idea is to flexible suppress console outputs in different environments. For example, you have some logging in your app, and don't want to delete or wrap every of this in check for current environment, then you can just require this lib and pass rules for every environment.

## Installation

``` bash
npm install express-suppress-console-log --save
```
or

``` bash
yarn add express-suppress-console-log
```

## Usage

Require library in top of your `app.js` file (or other entry point of your app) and pass environment rules.

``` javascript
const envs = {
  "production": {
    "disabled": true
  },
  "development": {
    "disabled": false
  },
  "staging": {
    "disabled": false
  }
}

require("express-suppress-console-log")(envs)
```

### Tests

```bash
npm test
```