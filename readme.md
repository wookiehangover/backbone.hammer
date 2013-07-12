# backbone.hammer.js

v0.0.3

A [Hammerjs](http://eightmedia.github.io/hammer.js/) adapater for
[Backbone](http://backbonejs.org). Enables hammerjs event
bindings for Backbone Views. For attaching touch events in the same
style as Backbone delegateEvents. Works with or without AMD.

## Install with [Bower](http://bower.io/)

```
$ bower install --save backbone.hammer.js
```

## Usage

Depends on the [hammerjs jquery plugin](https://github.com/EightMedia/hammer.js/blob/master/dist/jquery.hammer.js) (Backbone Views need jQuery after
all).

```javascript
var view = new Backbone.View({
  hammerEvents: {
    'swipeleft h1': 'handleSwipe',
    'tap h1': 'handleTap'
  },
  hammerOptions: {
    tap: true
  },
  handleSwipe: function(){
    console.log('Stop.');
  },
  handleTap: function(){
    console.log('Hammer time!');
  }
});

view.$('h1').trigger('swipeleft');
// → "Stop."
view.$('h1').trigger('tap');
// → "Hammer time!"

// Access the view's hammer instance
view.hammer();
// → view.$el.hammer()
```

Works alongside `delegateEvents` and `undelegateEvents`, so normal event
bindings will be uneffected by adding hammer events.

## API

All additional methods are attached to Backbone.View.prototype.

**Backbone.View.prototype.initialize/constructor**

View constructors will accept two additional options that will be
automatically attached to instances, `hammerOptions` and `hammerEvents`.
See examples above for passing these directly to a constructor.

**Backbone.View.prototype.delegateHammerEvents** `delegateEvents([events])`

Uses hammer's jQuery interface to attach delegated hammer events to the
view's element. Accepts an optional events object that will be used in
place of View.prototpe.events. Unbinds any previously bound hammer
events prior to attaching new events.

**Backbone.View.prototype.undelegateHammerEvents** `undelegateHammerEvents()`

Removes any bound event handlers that were created with
`delegateHammerEvents`.

**Backbone.View.prototype.hammer** `hammer([options])`

Returns the hammer instance for the view's element, directly exposing
the hammer API if you need to create hammer events directly.

**Backbone.hammerOptions**

An optionally declared options hash that will be default settings for
any view that uses `hammerEvents`.

## License

MIT
