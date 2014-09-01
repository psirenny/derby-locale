var _ = require('lodash');
var locale = require('locale');

exports.locale = function (obj) {
  if (!obj.supported[0]) return '';
  var supported = obj.supported;
  var preferred = _(obj.strategies).sortBy('order').flatten('locales').value();
  var def = obj.default || supported[0];
  if (!preferred[0]) return def;
  supported = new locale.Locales(supported);
  preferred = new locale.Locales(preferred);
  return preferred.best(supported).toString();
};
