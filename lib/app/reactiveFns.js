module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('$locale.supported', function (translations) {
      return Object.keys(translations);
    });
  });
};