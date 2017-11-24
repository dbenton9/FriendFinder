// link routes to friends.js data
var friends = require("../data/friends");

// routing
module.exports = function(app) {

    // get request for when user selects to visit this page
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function(req, res) {

        // object stores bestMatch
        var bestMatch = {
          name: "",
          photo: "",
          friendDifference: Infinity
        };
    
        // takes user entered content from form
        var userData = req.body;
        var userScores = userData.scores;
    
        //  variable used to compare similarity between current subject and future subject
        var totalDifference;
    
        // loop through all friends
        for (var i = 0; i < friends.length; i++) {
          var currentFriend = friends[i];
          totalDifference = 0;
    
          console.log(currentFriend.name);
    
          // calculate totalDifference value of each friend
          for (var j = 0; j < currentFriend.scores.length; j++) {
            var currentFriendScore = currentFriend.scores[j];
            var currentUserScore = userScores[j];
    
            totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
          }
    
          // conditional statement to determine who will be bestMatch based on totalDifference
          if (totalDifference <= bestMatch.friendDifference) {
        
            bestMatch.name = currentFriend.name;
            bestMatch.photo = currentFriend.photo;
            bestMatch.friendDifference = totalDifference;
          }
        }
        
        // pushes new user data into api        
        friends.push(userData);
        
        // returns bestMatch
        res.json(bestMatch);
    });
};

