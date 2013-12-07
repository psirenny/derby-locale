var _ = require('lodash')
  , findit = require('findit')
  , fs = require('fs')
  , loader = require('./loader')
  , MessageFormat = require('messageformat')
  , path = require('path')
  , traverse = require('traverse')
  , vm = require('vm');

exports.compile = function (options, callback) {
  if (!options.load) options.load = loader.filesystem(options);

  function getFormats(callback) {
    var dir = path.resolve(require.resolve('messageformat'), '../locale')
      , find = findit(dir)
      , sandbox = {MessageFormat: {locale: {}}}
      , context = vm.createContext(sandbox);

    find.on('file', function (file) {
      if (path.extname(file) !== '.js') return;
      var code = fs.readFileSync(file, {encoding: 'utf8'});
      vm.runInContext(code, context);
    });

    find.on('end', function () {
      callback(context.MessageFormat);
    });
  }

  getFormats(function (defaultFormats) {
    var find = findit(options.directory);

    options.load(function (err, formats, translations) {
      if (err) return callback(err);
      formats = _.merge(defaultFormats, formats || {});
      callback(null, traverse(translations).map(function (translation) {
        if (this.level < 2) return;
        if (!this.isLeaf) return;
        var locale = this.path[0];
        var messageformat = new MessageFormat(locale, formats.locale[locale]);
        this.update(messageformat.precompile(messageformat.parse(translation)), true);
      }));
    });
  });
};