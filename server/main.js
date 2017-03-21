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
            }
        },
        function(error, result){
            if(error)console.log(error);
            if(result)console.log(result);
        }
        );
    },
    'likePost': function(postId){
      var update = true;
      Posts.update(
      {_id:postId},{$addToSet : {"likes.users":this.userId}}),
          function(error, result) {
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
      {_id:postId}),

          {$inc: {"likes.totalLikes": + 1}},
                function (error, result){
          if (error) console.log(error);
          if (result) console.log(result);
         }
        },
            'unlikePost':function(postId){
                Posts.update({_id:postId},
                    {$inc : {"likes.totalLikes": - 1}}),
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
})
    Meteor.publish('userPosts', function(){
    return Posts.find();
});
});
