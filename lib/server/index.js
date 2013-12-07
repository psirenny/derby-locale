var _ = require('lodash')
  , locale = require('locale');

module.exports = function (options) {
  if (!options) options = {};

  return function (req, res, next) {
    var model = req.getModel()
      , preffered = model.setNull('$locale.preffered', options.preffered)
      , supported = model.setNull('$locale.supported', options.supported);

    preffered = _(preffered).flatten().unique();
    preffered = new locale.Locales(preffered);
    model.set('$locale.locale', preffered.best(supported).toString());
    next();
  };
};