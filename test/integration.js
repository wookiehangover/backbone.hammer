jQuery(function($){
  module('backbone.hammer.js: integration', {
    setup: function(){
      this.tapStub = sinon.stub();
      this.clickStub = sinon.stub();
      this.viewOptions = {
        el: $('#testElement'),
        hammerEvents: {
          'tap': this.tapStub,
          'tap h1': this.tapStub
        },
        events: {
          'click': this.clickStub,
          'click h1': this.clickStub
        }
      };
    },
    teardown: function(){
      this.clickStub.reset();
      this.tapStub.reset();
    }
  });

  test('hammerEvents and delegateEvents in a constructor', 2, function(){
    var view = new Backbone.View(this.viewOptions);

    view.$el.trigger('tap');
    ok( this.tapStub.called );
    view.$el.trigger('click');
    ok( this.clickStub.called );
  });

  test('delegating still works as expected', 2, function(){
    var view = new Backbone.View(this.viewOptions);

    view.$('h1').trigger('tap');
    ok( this.tapStub.calledTwice );
    view.$('h1').trigger('click');
    ok( this.clickStub.calledTwice );
  });

  test('hammerEvents and delegateEvents in a constructor', 2, function(){
    var View = Backbone.View.extend(this.viewOptions);
    var view = new View();

    view.$el.trigger('tap');
    ok( this.tapStub.called );
    view.$el.trigger('click');
    ok( this.clickStub.called );
  });

  test('global options', function(){
    Backbone.hammerOptions = { tap_always: false };
    var View = Backbone.View.extend(this.viewOptions);
    var spy = sinon.spy(View.prototype, 'hammer');
    var view = new View();
    ok( spy.calledWith({ tap_always: false }) );
    spy.reset();

    view.hammerOptions = { tap_always: true };
    view.undelegateHammerEvents();
    view.delegateHammerEvents();
    ok( spy.calledWith({ tap_always: true }) );

    spy.restore();
    Backbone.hammerOptions = {};
  });
});

