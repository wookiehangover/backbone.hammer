(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['underscore', 'backbone', 'jquery-hammerjs'], function(_, Backbone) {
      factory(_, Backbone);
    });
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    var Backbone = require('backbone');
    require('jquery-hammerjs');
    factory(_, Backbone);
  } else {
    // Browser globals
    factory(root._, root.Backbone);
  }
}(this, function(_, Backbone) {
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
      for(var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        eventName += '.hammerEvents' + this.cid;
        method = _.bind(method, this);
        this.hammer(options, selector).on(eventName, method);
      }
      return this;
    },

    hammer: function(options, selector){
      this._hammered = true;
      var $element = selector ? this.$(selector) : this.$el;
      return $element.hammer(options);
    }
  });
}));
