import { Meteor } from 'meteor/meteor';

Meteor.publish('playerNames', function() {
    // {} as the first argument of find will return all.
    return Meteor.users.find({}, {fields: {username: 1}});
});

Meteor.startup(() => {
  // code to run on server at startup
    
Meteor.methods({
    'insertPost' : function(post){
        Posts.insert(
        {
            post:post,
            date: new Date(),
            createdBy: this.userId,
            likes:{
                totalLikes:0,
                users:[]
            },
            retweets:{
                totalRetweets:0,
                users:[]
            }
        },
        function(error, result){
            if(error)console.log(error);
            if(result)console.log(result);
        }
        );
    }
})
    Meteor.publish('userPosts', function(){
    return Posts.find();
});
});
