module.exports = function (options) {
  if (!options) options = {};
  return function (req, res, next) {
    exports.server.load(function (err, $locale) {
      if (err) return next(err);
      var model = req.getModel();
      model.set(options.obj || '$locale', $locale);
      next();
    });
  };
};

module.exports.load = function (options, callback) {
  if (!callback) callback = options;
  if (!options) options = {};
  var $locale = {};
  $locale.strategies = options.strategies || {};
  $locale.supported = options.supported || [];
  callback(null, $locale);
};
