ligle-addon-permission
=====================
[![Build Status](https://travis-ci.org/a-oak/ligle-addon-permission.svg?branch=master)](https://travis-ci.org/a-oak/ligle-addon-permission)
[![Build Status](https://travis-ci.org/a-oak/ligle-addon-permission.svg?branch=develop)](https://travis-ci.org/a-oak/ligle-addon-permission)
Copyright (c) 2015 [A-Oak](http://a-oak.com/) Co. Ltd. under MIT LICENSE.


## INSTALL

```shell
npm install ligle-addon-permission --save
```

add this into your application to load the plugins

```js 
var ligle = require('ligle-engine')(cfg);
require('ligle-addon-permission')(ligle);
```

you can use `ligle.addon.permission` class now.

## Provide:
this offers function for permission checking.
