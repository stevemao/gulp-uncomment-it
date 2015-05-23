'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var join = require('path').join;
var uncommentIt = require('../');

it('should uncomment html, js or css', function(cb) {
  var fixtureHtml = fs.readFileSync(join(__dirname, 'fixtures/uncomment-me.html'));
  var expectedHtml = fs.readFileSync(join(__dirname, 'expected/uncommented.html'), 'utf8');
  var fixtureJs = fs.readFileSync(join(__dirname, 'fixtures/uncomment-me.js'));
  var expectedJs = fs.readFileSync(join(__dirname, 'expected/uncommented.js'), 'utf8');
  var fixtureCss = fs.readFileSync(join(__dirname, 'fixtures/uncomment-me.css'));
  var expectedCss = fs.readFileSync(join(__dirname, 'expected/uncommented.css'), 'utf8');

  var stream = uncommentIt();

  stream.on('data', function(file) {
    if (file.path === join(__dirname, 'fixtures/uncomment-me.html')) {
      assert.equal(file.contents.toString(), expectedHtml);
    } else if (file.path === join(__dirname, 'fixtures/uncomment-me.js')) {
      assert.equal(file.contents.toString(), expectedJs);
    } else if (file.path === join(__dirname, 'fixtures/uncomment-me.css')) {
      assert.equal(file.contents.toString(), expectedCss);
    } else {
      assert.ifError(true);
    }
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    cwd: __dirname,
    base: join(__dirname, 'fixtures'),
    path: join(__dirname, 'fixtures/uncomment-me.html'),
    contents: fixtureHtml
  }));

  stream.write(new gutil.File({
    cwd: __dirname,
    base: join(__dirname, 'fixtures'),
    path: join(__dirname, 'fixtures/uncomment-me.js'),
    contents: fixtureJs
  }));

  stream.write(new gutil.File({
    cwd: __dirname,
    base: join(__dirname, 'fixtures'),
    path: join(__dirname, 'fixtures/uncomment-me.css'),
    contents: fixtureCss
  }));

  stream.end();
});
