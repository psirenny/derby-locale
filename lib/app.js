var _ = require('lodash');
var locale = require('locale');

exports.locale = function ($locale) {
  if (!$locale) $locale = this.model.get('$locale');
  if (!$locale.supported[0]) return '';
  var supported = $locale.supported;
  var preferred = _($locale.strategies).sortBy('order').flatten('preferred').value();
  if (!preferred[0]) return supported[0];
  supported = new locale.Locales(supported);
  preferred = new locale.Locales(preferred);
  return preferred.best(supported).toString();
};
