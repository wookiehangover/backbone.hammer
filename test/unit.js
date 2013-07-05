jQuery(function($){
  module('backbone.hammer.js');

  test('adds hammer methods to Backbone.View.prototype', 4, function(){
    ok(Backbone.View.prototype.hammer);
    ok(Backbone.View.prototype.undelegateHammerEvents);
    ok(Backbone.View.prototype.delegateHammerEvents);
    ok(Backbone.View.prototype.hammer);
  });

  test('#hammer', function(){
    var view = new Backbone.View();
    var hammerStub = sinon.stub(view.$el, 'hammer');
    view.hammer();
    ok(hammerStub.called);
    hammerStub.restore();
  });

  test('#delegateEvents calls delegateHammerEvents', 1, function(){
    var stub = sinon.stub(Backbone.View.prototype, 'delegateHammerEvents');
    new Backbone.View({
      'tap': $.noop
    });
    ok(stub.called);
    stub.restore();
  });

  test('#delegateHammerEvents', 2, function(){
    var hammerOptions = {
      tap: false
    };

    var View = Backbone.View.extend({
      hammerEvents: {
        'tap': $.noop
      },
      hammerOptions: hammerOptions
    });

    var onStub = sinon.stub();
    var hammerStub = sinon.stub(View.prototype, 'hammer');
    hammerStub.returns({
      on: onStub,
      off: $.noop
    });

    var view = new View();
    ok(hammerStub.calledWith(hammerOptions));
    ok(onStub.calledWith('tap.hammerEvents'+ view.cid));
    hammerStub.restore();
  });

  test('hammerEvents are mixed in from the constructor', function(){
    var view = new Backbone.View({
      hammerEvents: {
        'tap': function(){}
      },
      hammerOptions: {
        foo: true
      }
    });
    ok( view.hammerEvents.tap );
    ok( view.hammerOptions.foo );
  });
});
