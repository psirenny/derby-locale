var _ = require('lodash');
var locale = require('locale');

exports.locale = function ($locale) {
  if (!$locale.supported[0]) return '';
  var supported = $locale.supported;
  var preferred = _($locale.strategies).sortBy('order').flatten('locales').value();
  var def = $locale.default || supported[0];
  if (!preferred[0]) return def;
  supported = new locale.Locales(supported);
  preferred = new locale.Locales(preferred);
  return preferred.best(supported).toString();
};
