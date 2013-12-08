var _ = require('lodash')
  , locale = require('locale');

module.exports = function (app, options) {
  if (!options) options = {};
  if (!options.supported) options.supported = ['en'];

  return function (req, res, next) {
    var model = req.getModel()
      , preferred = model.setNull('$locale.preferred', options.preferred)
      , supported = model.setNull('$locale.supported', options.supported);

    preferred = _(preferred).flatten().compact().unique().value();
    supported = _(supported).flatten().compact().unique().value();
    model.set('$locale.preferred', preferred);
    model.set('$locale.supported', supported);
    preferred = new locale.Locales(preferred);
    supported = new locale.Locales(supported);
    model.set('$locale.locale', preferred.best(supported).toString());
    next();
  };
};