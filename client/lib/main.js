Meteor.subscribe('playerNames');

if (Meteor.isClient){
Meteor.subscribe('userPosts');

Template.contactUs.helpers({
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
    }
});
Template.contactUs.onRendered(function () {
    $("#postForm").validate();
});
Template.contactUs.events({
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
}
