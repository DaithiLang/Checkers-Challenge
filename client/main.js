

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.increment = new ReactiveVar(0);
  this.decrement = new ReactiveVar(10);
});

Template.hello.helpers({
  increment : function inc(){
    return Template.instance().increment.get();
  },
  decrement : function dec(){
	  return Template.instance().decrement.get();
  },
});

Template.hello.events({
  'click .bt1' : function(event, instance) {
    // increment the var when button is clicked
    instance.increment.set(instance.increment.get() + 1);
  },
  'click .bt2' : function(event, instance){
	  instance.decrement.set(instance.decrement.get() - 1);
  }
});
