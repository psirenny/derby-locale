var _ = require('lodash')
  , locale = require('locale');

  module.exports = function (app, options) {
  return function (req, res, next) {
    var model = req.getModel()
      , preffered = model.setNull('$locale.preffered', options.preffered)
      , supported = model.setNull('$locale.supported', options.supported);

    preffered = _(preffered).compact().map().flatten().unique();
    preffered = new locale.Locales(preffered);
    model.set('$locale.locale', preffered.best(supported).toString());
    next();
  };
};