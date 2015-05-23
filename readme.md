# gulp-uncomment-it [![Build Status](https://travis-ci.org/stevemao/gulp-uncomment-it.svg?branch=master)](https://travis-ci.org/stevemao/gulp-uncomment-it)

> Uncomment html, js or css with [uncomment-it](https://github.com/stevemao/uncomment-it)

*Issues with the output should be reported on the uncomment-it [issue tracker](https://github.com/stevemao/uncomment-it/issues).*


## Install

```
$ npm install --save-dev gulp-uncomment-it
```


## Usage

```js
var gulp = require('gulp');
var uncommentIt = require('gulp-uncomment-it');

gulp.task('default', function () {
  return gulp.src('src/*.html')
    .pipe(uncommentIt())
    .pipe(gulp.dest('dist'));
});
```


## License

MIT © [Steve Mao](https://github.com/stevemao)
