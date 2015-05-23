'use strict';
var assign = require('object-assign');
var chalk = require('chalk');
var extname = require('path').extname;
var gutil = require('gulp-util');
var through = require('through2');
var uncommentIt = require('uncomment-it');

module.exports = function(opts) {
  opts = assign({
    // TODO: remove this when gulp get's a real logger with levels
    verbose: process.argv.indexOf('--verbose') !== -1
  }, opts);

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-uncomment-it', 'Streaming not supported'));
      return;
    }

    var path = file.path;
    var type = opts.type || extname(path).replace('.', '');

    var result = uncommentIt(file.contents.toString(), type);
    file.contents = new Buffer(result.data);

    var comments = result.comments;
    var uncommentedCount = comments.length;

    if (opts.verbose && uncommentedCount > 0) {
      comments.forEach(function(comment) {
        gutil.log(chalk.green(comment) + chalk.cyan('uncommented'));
      });

      gutil.log(path + ': ' + chalk.green('✔ ') + uncommentedCount + ' comments uncommented.');
    }

    cb(null, file);
  });
};
