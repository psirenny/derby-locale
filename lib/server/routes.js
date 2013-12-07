var _ = require('lodash');

module.exports = function (app) {
  app.post('/locale/changeLocale', function (req, res) {
    var locale = req.body.locale;
    var supported = model.get('$locale.supported');
    if (!locale) return res.send(400, {error: 'locale missing'});
    if (!_.contains(supported, locale)) return res.send(400, {error: 'unsupported locale'});
    res.send();
  });

  return function (req, res, next) {
    next();
  }
};