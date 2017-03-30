Meteor.subscribe('playerNames');

if (Meteor.isClient) {
  Meteor.subscribe('userPosts');
  Template.game.helpers({
    playersInRoom1 : function() {
      if (playersInRoom1 > 1) {
        return 'FULL: ' + playersInRoom1;
      } else {
        return playersInRoom1;
      }
    },
    playersInRoom2 : function() {
      if (playersInRoom2 > 1) {
        return 'FULL: ' + playersInRoom2;
      } else {
        return playersInRoom2;
      }
    },
    playersInRoom3 : function() {
      if (playersInRoom3 > 1) {
        return 'FULL: ' + playersInRoom3;
      } else {
        return playersInRoom3;
      }
    },
    isRoom1Full : function() {
      return playersInRoom1 > 1;
    },
    isRoom2Full : function() {
      return playersInRoom2 > 1;
    },
    isRoom3Full : function() {
      return playersInRoom3 > 1;
    },
    charsRemaining : function() {
      return Session.get('CharactersRemaining');
    },
    posts : function() {
      return Posts.find({}, {sort: {date: -1}});
    },
    timeDiff : function(postDate) {
      var timeDiff = new Date().getTime() - postDate.getTime();
      var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      var diffHours = Math.floor(timeDiff  / (1000 * 3600));
      var diffMins = Math.floor(timeDiff  / (1000 * 60));
      var diffSecs = Math.floor(timeDiff  / (1000));

      if (diffDays > 0)
        return ("about " + diffDays + "d ago");
      else if (diffHours > 0)
        return ("about " + diffHours + "h ago");
      else if (diffMins > 0 )
        return ("about " + diffMins + "m ago");
      else if (diffSecs > 0)
        return ("about " + diffSecs + "s ago");
    },
    userCreated : function(createdBy) {
      if(createdBy == Meteor.userId())
        return true;
      else
        return false;
    }
  });
  Template.game.onRendered(function() {
    $("#postForm").validate();
  });
  Template.game.events({
    'click #room1' : function(event) {
      if (playersInRoom1 < 2) playersInRoom1++;
    },
    'click #room2' : function(event) {
      if (playersInRoom2 < 2) playersInRoom2++;
    },
    'click #room3' : function(event) {
      if (playersInRoom3 < 2) playersInRoom3++;
    },
    'keyup #inputPost' : function(event) {
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
      if(event.toElement.checked) {
        $('#edit' + this._id).removeClass('hidden');
        $('#post' + this._id).hide();
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
}
