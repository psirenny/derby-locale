module.exports = function (options) {
  if (!options) options = {};
  return function (req, res, next) {
    module.exports.load(options, function (err, $locale) {
      if (err) return next(err);
      var model = req.getModel();
      var path = options.path || '$locale';
      model.set(path + '.default', $locale.default);
      model.set(path + '.strategies', $locale.strategies);
      model.set(path + '.supported', $locale.supported);
      next();
    });
  };
};

module.exports.load = function (options, callback) {
  if (!callback) callback = options;
  if (!options) options = {};
  var $locale = {};
  $locale.default = options.default || '';
  $locale.strategies = options.strategies || {};
  $locale.supported = options.supported || [];
  callback(null, $locale);
};
