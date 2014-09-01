Derby Locale
============

Enable [Derby JS](http://derbyjs.com) applications to select the best locale from a list of supported locales.

[![Build Status](https://travis-ci.org/psirenny/derby-locale.png?branch=master)](https://travis-ci.org/psirenny/derby-locale)

Strategies such as [derby-locale-browser](https://github.com/psirenny/derby-locale-browser) must be added to provide a list of preffered locales.

Installation
------------

    $ npm install derby-locale --save

Server Usage
------------

In your server file, add the middleware:

    var locale = require('derby-locale').server;

    expressApp
      // ...
      // ...
      .use(locale({
        default: 'en',
        supported: ['en', 'es']
      }))

Change or add default and supported locales as necessary.

App Usage
---------

Require the locale function:

    var locale = require('derby-locale').app.locale;

Set it up as a view function:

    app.proto.locale = locale;

And then in your view:

    <p>{{locale($locale)}}</p>

*Alternatively*, set it up as a reactive function:

    app.on('model', function (model) {
      model.fn('locale', locale);
    });

    app.get('/', function (page, model) {
      model.start('_page.locale', '$locale', 'locale');
      page.render();
    });

And then in your view:

    <p>{{_page.locale}}</p>

Options
-------

**default** – Default locale to use. If unset, the first supported locale will be the default.

**path** – Default path to locale information. Defaults to `$locale`.

**strategies** – An object containing strategies that determine the best locale.

**supported** – An array of supported locales. It is empty by default;

Strategies
----------

At least one strategy must be added in order to select the best locale.  
Strategies are stored on `$locale.strategies` and have the following definition:

    $locale: {
      strategies: {
        example1: {
          locales: ['en', 'es'],
          order: 2 // optional
        },
        example2: {
          locales: ['ca'],
          order: 1 // optional
        }
      }
    }

Strategies provide a list of preferred locales.
[derby-locale-browser](https://github.com/psirenny/derby-locale-browser) is a good example of a strategy.
It is created via middleware; however, strategies may be created in app routes as well:

    app.get('/', function (page, model) {
      // ...

      var strategy = model.at('$locale.strategies.user');

      // update the page's locale according to the user's preference
      strategy.ref('locales.0', '_page.user.locale');

      // prioritize this user's preferences
      strategy.set('order', 1);

      // ...
    });

Strategies are processed in the order they are declared.
As such, earlier strategies have a greater chance of having one of their locales selected from the list of supported locales.

The ordering of strategies can be re-arranged by setting their `order` property.
Strategies are sorted in ascending order.

Client
------

By default, settings configured in the server middleware are stored on the path `$locale`.  

Locale objects may be changed client side as well.
For instance, you may store an array of supported locales in the database and subscribe to them at `$locale.supported`.

    app.get('/', function (page, model, params, next) {
      var locales = model.at('locales.supported');

      locales.subscribe(function (err) {
        if (err) return next(err);
        model.ref('$locale.supported', locales);
        page.render();
      });
    });
