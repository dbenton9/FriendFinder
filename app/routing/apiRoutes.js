// link routes to friends.js data
var friends = require("../data/friends");

// routing
module.exports = function(app) {

    // get request for when user selects to visit this page
    app.get("/app/friends", function(req, res) {
        res.json(friends);
    });

    app.post("api/friends", function(req, res) {

        // object stores best match
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        // takes user entered content from form
        var userData = req.body;
        var userScores = userData.scores;

        // variable denoting an absolute value for similarity between user's score and other's
        var totalDifference;

        // loop that runs through different potential matches
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            // loop that calculates scores
            for (var j=0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currenFriend.scores[j];
                var currentUserScore = userScores[j];

                // equation calculates the totalDifference between user and other friendds
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            // conditional statement evals whether new totalDifference is less than current best match
            if (totalDifference <= bestMatch.friendDifference) {
                // if condition met then bestMatch replaced with new
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        // push new user's data to friend database
        friends.push(userData);

        // return JSON with bestMatch to display on html
        res.json(bestMatch);
    });
};