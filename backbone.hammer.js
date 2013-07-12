(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['underscore', 'backbone'], function(_, Backbone) {
      factory(root, Backbone, _);
    });
  } else {
    // Browser globals
    factory(root, root.Backbone, root._);
  }
}(this, function(root, Backbone, _) {
  var $ = Backbone.$;

  if( !$.fn.hammer ){
    return;
  }

  // override _configure to esure that `hammerEvents` and `hammerOptions` are
  // mixed into the instance when passed to the constructor
  var viewOptions = ['hammerEvents', 'hammerOptions'];

  var undelegateEvents = Backbone.View.prototype.undelegateEvents;
  var delegateEvents = Backbone.View.prototype.delegateEvents;
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  var extend = Backbone.View.extend
  var parent = Backbone.View;
  var protoProps = Backbone.View.prototype;

  Backbone.View = function(options){
    options = options || {};
    _.extend(this, _.pick(options, viewOptions));
    return parent.apply(this, arguments);
  }

  _.extend(Backbone.View.prototype, protoProps, {
    undelegateEvents: function(){
      this.undelegateHammerEvents();
      return undelegateEvents.apply(this, arguments);
    },

    undelegateHammerEvents: function(){
      this.hammer().off('.hammerEvents' + this.cid);
      return this;
    },

    delegateEvents: function(){
      delegateEvents.apply(this, arguments);
      this.delegateHammerEvents();
      return this;
    },

    delegateHammerEvents: function(events){
      var options = this.hammerOptions || {};
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
      return this.$el.hammer(options);
    }
  });

  Backbone.View.extend = extend;

}));
