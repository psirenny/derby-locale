'use strict';

var app = require('./app');

module.exports = function (options) {
  if (!options) options = {};

  return function (req, res, next) {
    var model = req.getModel();
    if (!model) return next();

    module.exports.load(options, function (err, obj) {
      if (err) return next(err);
      var $locale = model.at(options.path || '$locale');
      $locale.setNull('strategies', obj.strategies);
      $locale.set('default', obj.default);
      $locale.set('supported', obj.supported);
      $locale.set('locale', app.locale($locale.get()));
      next();
    });
  };
};

module.exports.load = function (options, callback) {
  if (!callback) callback = options;
  if (!options) options = {};
  
  var obj = {};
  obj.default = options.default || '';
  obj.strategies = options.strategies || {};
  obj.supported = options.supported || [];
  callback(null, obj);
};
