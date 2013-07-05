# backbone.hammer.js

A [Hammerjs]() adapater for [Backbone](). Enables hammerjs event
bindings for Backbone Views. For attaching touch events in the same
style as Backbone delegateEvents.

## Usage

Depends on the [hammerjs jquery plugin]() (Backbone Views need jQuery after
all).

```javascript
var view = new Backbone.View({
  hammerEvents: {
    'tap h1': 'handleTap'
  },

  hammerOptions: {
    tap: true
  },

  handleTap: function(){
    console.log('hammer time!');
  }
});

view.$('h1').trigger('tap');
// → "hammer time!"

// Creates a hammer instance on the view's element
view.hammer();
// → view.$el.hammer()
```

Works alongside `delegateEvents` and `undelegateEvents`, so normal event
bindings will be uneffected by adding hammer events.

## API

All additional methods are attached to Backbone.View.prototype.

**initialize/constructor**

View constructors will accept two additional options that will be
automatically attached to instances, `hammerOptions` and `hammerEvents`.
See examples above for passing these directly to a constructor.

**delegateHammerEvents** delegateEvents([events])

Uses hammer's jQuery interface to attach delegated hammer events to the
view's element. Accepts an optional events object that will be used in
place of View.prototpe.events. Unbinds any previously bound hammer
events prior to attaching new events.

**undelegateHammerEvents** undelegateHammerEvents()

Removes any bound event handlers that were created with
`delegateHammerEvents`.

**hammer** hammer([options])

Returns the hammer instance for the view's element, directly exposing
the hammer API if you need to create hammer events directly.


