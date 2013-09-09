# backbone.hammer.js

v0.1.0

A [Hammerjs](http://eightmedia.github.io/hammer.js/) adapater for
[Backbone](http://backbonejs.org). Enables hammerjs event
bindings for Backbone Views. For attaching touch events in the same
style as Backbone delegateEvents. Works with or without AMD.

## Install with [Bower](http://bower.io/)

```
$ bower install --save backbone.hammer.js
```

## Usage

Depends on the [Hammerjs jQuery
plugin](https://github.com/EightMedia/hammer.js/blob/master/dist/jquery.hammer.js),
jQuery and, of course, Backbone & Underscore.

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

**View.prototype.initialize/constructor** `new Backbone.View([options])`

View constructors will accept two additional options that will be
automatically attached to instances, `hammerOptions` and `hammerEvents`.
See examples above for passing these directly to a constructor.

**View.prototype.delegateHammerEvents** `delegateHammerEvents([events])`

Uses hammer's jQuery interface to attach delegated hammer events to the
view's element. Accepts an optional events object that will be used in
place of View.prototpe.events. Unbinds any previously bound hammer
events prior to attaching new events. Called simultaneously with
`delegateEvents`.

**View.prototype.undelegateHammerEvents** `undelegateHammerEvents()`

Removes any bound event handlers that were created with
`delegateHammerEvents`. Automatically called by `undelegateEvents`, so
hammer events are removed along with other events on the view.

**View.prototype.hammer** `hammer([options])`

Returns the hammer instance for the view's element, directly exposing
the hammer API if you need to create hammer events directly.

In most cases, the default behavior of creating a hammer instance on the
view's `el` will be sufficient. This method can be overridden if you'd
like to declare touch events on another element, just make sure to
return a call to the hammer jQuery plugin:

```javascript
hammer: function(options){
  return this.$('.touch-area').hammer(options);
}
```

**Backbone.hammerOptions**

Default settings for any view that uses `hammerEvents`. See the [hammer
docs](https://github.com/EightMedia/hammer.js/wiki/Getting-Started#gesture-options) for more info.

```javascript
Backbone.hammerOptions = {
  prevent_default: true
};
```

## License

MIT
