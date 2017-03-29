Meteor.subscribe('playerNames');

if (Meteor.isClient) {
  Meteor.subscribe('userPosts');
  Template.game.helpers({
    charsRemaining: function () {
      return Session.get('CharactersRemaining');
    },
    posts : function () {
      return Posts.find({}, {sort: {date: -1}});
    },
    timeDiff : function (postDate) {
      var timeDiff = new Date().getTime() - postDate.getTime();
      var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      var diffHours = Math.floor(timeDiff  / (1000 * 3600));
      var diffMins = Math.floor(timeDiff  / (1000 * 60));
      var diffSecs = Math.floor(timeDiff  / (1000));

      if (diffDays > 0)
        return ("about " + diffDays + "d ago");
      else if(diffHours > 0)
        return ("about " + diffHours + "h ago");
      else if(diffMins > 0 )
        return ("about " + diffMins + "m ago");
      else if(diffSecs > 0)
        return ("about " + diffSecs + "s ago");
    },
    userCreated : function (createdBy) {
      if(createdBy == Meteor.userId())
        return true;
      else
        return false;
    }
  });
  Template.game.onRendered(function () {
    $("#postForm").validate();
  });
  Template.game.events({
    'keyup #inputPost': function (event) {
      var inputText = event.target.value;
      Session.set("CharactersRemaining", (140 - inputText.length));
    },
    'submit #postForm' : function(event) {
      event.preventDefault();
      var post = event.target.inputPost.value;
      $('#inputPost').val('');
        Session.set("CharactersRemaining", 140 + "  " + " Charaters Remaining");
        Meteor.call('insertPost', post);
    },
    'click .editBox input' : function (event) {
      if(event.toElement.checked){
        $('#edit'+this._id).removeClass('hidden');
        $('#post'+this._id).hide();
      }
      else {
        var post = $('#edit' + this._id).val();
        Meteor.call('updatePost', {id : this._id, post: post});
        $('#edit' + this._id).addClass('hidden');
        $('#post' + this._id).show();
        $("h6").removeClass("test");
      }
    },
    'click .deletePost button' : function(event) {
        event.preventDefault();
        var curPostId = this._id;
        Posts.remove(curPostId);
    }
  });
    
  Template.hello.onCreated(function helloOnCreated(){
                           this.increment = new ReactiveVar(0);
                           });
    
    Template.hello.helpers({
        incremnt : function inc(){
            return Template.instance().increment.get();
        }
    });
    
   Template.hello.events({
       'click .bt' : function(event, instance) {
instance.increment.set(instance.increment.get() + 1); 
       }
   }); 
}



