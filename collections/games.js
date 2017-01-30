Games = new Mongo.Collection('games');

// May change the object type of some of these attributes later.
Games.schema = new SimpleSchema({
  "player1": {type: String}, // I chose these names rather than colors to give
  "player2": {type: String}, // us more flexibilty in how we display the game.
  "toPlay": {type: String},
  "currentBoard": {type: [String]}
});
