(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['underscore', 'backbone', 'hammerjs'], function(_, Backbone) {
      factory(root, _, Backbone);
    });
  } else {
    // Browser globals
    factory(root, root._, root.Backbone);
  }
}(this, function(root, _, Backbone) {
  var $ = Backbone.$;

  if( !$.fn.hammer ){
    throw new Error('Hammer jQuery plugin not loaded.');
  }

  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  var viewOptions = ['hammerEvents', 'hammerOptions'];

  var View = Backbone.View;
  var delegateEvents = View.prototype.delegateEvents;
  var undelegateEvents = View.prototype.undelegateEvents;

  Backbone.View = View.extend({
    constructor: function(options){
      options = options || {};
      _.extend(this, _.pick(options, viewOptions));
      return View.apply(this, arguments);
    },

    _hammered: false,

    undelegateEvents: function(){
      this.undelegateHammerEvents();
      return undelegateEvents.apply(this, arguments);
    },

    undelegateHammerEvents: function(){
      if (this._hammered) {
        this.hammer().off('.hammerEvents' + this.cid);
      }
      return this;
    },

    delegateEvents: function(){
      delegateEvents.apply(this, arguments);
      this.delegateHammerEvents();
      return this;
    },

    delegateHammerEvents: function(events){
      var options = _.defaults(_.result(this, 'hammerOptions') || {}, Backbone.hammerOptions);
      if (!(events || (events = _.result(this, 'hammerEvents')))) return this;
      this.undelegateHammerEvents();
      for(var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        eventName += '.hammerEvents' + this.cid;
        method = _.bind(method, this);
        if (selector === '') {
          this.hammer(options).on(eventName, method);
        } else {
          this.hammer(options).on(eventName, selector, method);
        }
      }
      return this;
    },

    hammer: function(options){
      this._hammered = true;
      return this.$el.hammer(options);
    }
  });
}));
