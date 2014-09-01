var lib = require('..');
var should = require('chai').should();

describe('derby-locale', function () {
  it('should be an object', function () {
    lib.should.be.an('object');
  });

  describe('app', function () {
    it('should be an object', function () {
      lib.app.should.be.an('object');
    });

    describe('locale', function () {
      it('should return a blank locale', function () {
        lib.server.load(function (err, $locale) {
          var locale = lib.app.locale($locale);
          locale.should.be.a('string');
          locale.should.be.blank;
        });
      });

      it('should return the first supported locale', function () {
        var opts = {supported: ['es', 'ca']};
        lib.server.load(opts, function (err, $locale) {
          var locale = lib.app.locale($locale);
          locale.should.be.a('string');
          locale.should.eql('es');
        });
      });

      it('should reeturn the default locale', function () {
        var opts = {default: 'ca', supported: ['es', 'ca']};
        lib.server.load(opts, function (err, $locale) {
          var locale = lib.app.locale($locale);
          locale.should.be.a('string');
          locale.should.eql('ca');
        });
      });

      it('should return the best locale', function () {
        var opts = {supported: ['es', 'en_US']};
        opts.strategies = {test: {locales: ['en', 'es']}};
        lib.server.load(opts, function (err, $locale) {
          var locale = lib.app.locale($locale);
          locale.should.be.a('string');
          locale.should.eql('en_US');
        });
      });

      it('should order strategies by order num', function () {
        var opts = {supported: ['en', 'es', 'de']};
        opts.strategies = {};
        opts.strategies.test1 = {order: 2, locales: ['es', 'en']};
        opts.strategies.test2 = {order: 1, locales: ['de']};
        lib.server.load(opts, function (err, $locale) {
          var locale = lib.app.locale($locale);
          locale.should.be.a('string');
          locale.should.eql('de');
        });
      });
    });
  });

  describe('server', function () {
    describe('middleware', function () {
      it('should be a function', function () {
        lib.server.should.be.a('function');
      });
    });

    describe('load', function () {
      it('should be a function', function () {
        lib.server.load.should.be.a('function');
      });

      it('should return a $locale object', function () {
        lib.server.load(function (err, $locale) {
          (err === null).should.be.true;
          $locale.should.be.an('object');
          $locale.should.have.property('strategies');
          $locale.strategies.should.be.an('object');
          $locale.should.have.property('supported');
          $locale.supported.should.be.an('array');
        });
      });

      it('should accept options', function () {
        var opts = {supported: ['en', 'es']};
        lib.server.load(opts, function (err, $locale) {
          (err === null).should.be.true;
          $locale.should.be.an('object');
          $locale.should.have.property('strategies');
          $locale.strategies.should.be.an('object');
          $locale.should.have.property('supported');
          $locale.supported.should.be.an('array');
          $locale.supported.should.eql(opts.supported);
        });
      });
    });
  });
});
