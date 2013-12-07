module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('lang.locales', function (translations) {
      return Object.keys(translations);
    });
  })
};