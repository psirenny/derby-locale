var _ = require('lodash')
  , locale = require('locale');

module.exports = function (options) {
  if (!options) options = {};

  return function (req, res, next) {
    var model = req.getModel()
      , prefferedLocales = model.setNull('$locale.prefferedLocales', options.prefferedLocales)
      , supportedLocales = model.setNull('$locale.supportedLocales', options.supportedLocales)
      , bestLocale = null;

    prefferedLocales = _(prefferedLocales).flatten().unique();
    prefferedLocales = new locale.Locales(prefferedLocales);
    bestLocale = prefferedLocales.best(supportedLocales).toString();
    model.set('$locale.locale', bestLocale);
    next();
  };
};