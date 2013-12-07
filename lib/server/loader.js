var findit = require('findit')
  , path = require('path')
  , traverse = require('traverse');

exports.filesystem = function (options) {
  if (!options.directory) options.directory = 'locale';
  options.directory = path.resolve(path.dirname(require.main.filename), options.directory);

  return function (callback) {
    var find = findit(options.directory)
      , formats = {locale: {}}
      , translations = {};

    find.on('file', function (file) {
      var extname = path.extname(file);
      if (extname !== '.js' && extname !== '.json') return;
      var namespace = path.relative(options.directory, file).split(path.sep);
      var key = path.basename(namespace.pop(), extname);
      if (key !== 'index') namespace.push(key);
      if (extname === '.js') return formats.locale[namespace[0]] = require(file);
      if (extname === '.json') traverse(translations).set(namespace, require(file));
    });

    find.on('end', function () {
      callback(null, formats, translations);
    });
  };
};