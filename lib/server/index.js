var _ = require('lodash')
  , locale = require('locale');

module.exports = function (app, options) {
  if (!options) options = {};

  return {
    init: function () {
      return function (req, res, next) {
        var model = req.getModel()
          , preffered = model.setNull('$locale.preffered', options.preffered)
          , supported = model.setNull('$locale.supported', options.supported);

        preffered = _(preffered).compact().map().flatten().unique();
        preffered = new locale.Locales(preffered);
        model.set('$locale.locale', preffered.best(supported).toString());
        next();
      };
    },
    routes: function () {
      app.post('/locale/changeLocale', function (req, res) {
        var supported = model.get('$locale.supported');
        if (!req.body.locale) return res.send(400, {error: 'locale missing'});
        if (!_.contains(supported, req.body.locale)) return res.send(400, {error: 'unsupported locale'});
        res.send();
      });

      return function (req, res, next) {
        next();
      }
    }
  };
};