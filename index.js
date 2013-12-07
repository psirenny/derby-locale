var _ = require('lodash')
  , locale = require('locale');

module.exports = function (app, options) {
  if (!options) options = {};

  return function (req, res, next) {
    var model = req.getModel()
      , preferred = model.setNull('$locale.preferred', options.preferred)
      , supported = model.setNull('$locale.supported', options.supported);

    preferred = _(preferred).flatten().compact().unique().value();
    model.set('$locale.preferred', preferred);
    preferred = new locale.Locales(preferred);
    model.set('$locale.locale', preferred.best(supported).toString());
    next();
  };
};