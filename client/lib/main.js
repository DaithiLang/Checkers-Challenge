Meteor.subscribe('playerNames');

if (Meteor.isClient){
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
            return ("about " + diffHours +"h ago");
        else if(diffMins > 0 )
            return ("about " + diffMins + "m ago");
        else if(diffSecs > 0)
            return ("about " + diffSecs + "s ago");
    },
    checked : function(users){
        if($.inArray(Meteor.userId(), users) > -1)
            return true;
        else
            return false;
    },
    userCreated : function (createdBy){
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
        Session.set("CharactersRemaining", (140-inputText.length) + "characters remaining");
        
    },
    'submit #postForm' : function(event){
        event.preventDefault();
        var post = event.target.inputPost.value;
        event.target.reset();
        Session.set("CharactersRemaining", 140 + "charaters remaining");
        Meteor.call('insertPost', post);
    }
});
    Template.game.events({
'keyup #inputPost': function(event) {
    var inputText = event.target.value;
    Session.set("CharactersRemaining", 140 + "charaters remaining");
},
        'submit #postForm': function(event) {
            event.preventDefault();
            var post = event.target.innerPost.value;
            $('#inputPost').val('');
            Session.set("CharactersRemaining", 140 + "charaters remaining");
            Meteor.call('innerPost', post);
        },
        'click .likeBox' : function(event) {
            if (event.toElement.checked){
                Meteor.call('likePost', this._id);
            }
            else{
                Meteor.call('unlikePost', this._id);
            }
        },
'likePost' : function(postId){
    var update = true;
    
    Posts.update(
    {_id:postId},
        {$addToSet : {"likes.users":this.userId}}
    ),function(error, result) {
        if (error)
            {
                update = false;
            }
        if (result)
            {
                update = true;
            }
    };
    if(update) (
    {_id:postId},
        {$inc: {"likes.totalLikes": +1}}
    ), function (error, result){
        if (error) console.log(error);
        if (result) console.log(result);                       
       };
      },
        'unlikePost':function(postId){
            Posts.update({_id:postId},
                {$inc : {"likes.totalLikes":-1}}),
                function (error, result){
        if (error) console.log(error);
        if (result) console.log(result);                       
       };
            Post.update(
            {_id:postId},
                {$pop : {"likes.users" : this.userId}}
            ),function (error, result){
        if (error) console.log(error);
        if (result) console.log(result);                       
       };
        },
        'deletePost' : function(postId){
            Post.remove(postId);
        },
        'updatePost' : function(postObj){
            Posts.update({_id:postObj.id}, {$set: {post : postObj.post}});
        }
    });
}
    
