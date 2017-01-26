Games = new Mongo.Collection('games');

// May change the object type of some of these attributes later.
Games.schema = new SimpleSchema({
  "black": {type: String},
  "white": {type: String},
  "toPlay": {type: String},
  "currentBoard": {type: [String]}
});
