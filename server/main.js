import { Meteor } from 'meteor/meteor';

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
