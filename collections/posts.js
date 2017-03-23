Posts = new Mongo.Collection('posts');
Posts.allow({

  remove: function(userId, posts){
    return true;
  }

});
