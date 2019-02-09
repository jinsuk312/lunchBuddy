// DEPENDENCIES //
var buddies = require("../data/buddies");

// ROUTING // 
module.exports = function(app){
    //get request
    //json.stringify + res.send = res.json
    app.get("/api/buddies", function(req,res){
        res.json(buddies);
    })
    //post request
    app.post("/api/buddies", function(req,res){
    // Our "server" will respond to a user"s survey result
    // Then compare those results against every user in the database.
    // It will then calculate the difference between each of the numbers and the user"s numbers.
    // It will then choose the user with the least differences as the "best lunchbuddy match."
    // In the case of multiple users with the same result it will choose the first match.
    // After the test, it will push the user to the database.
        //holds our "best match", will constantly be updated
        var bestMatch = {
            name: "",
            photo: "",
            buddyDifference: Infinity
        };
        // take the results of the users survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;
        //calculte the difference between the users scores and each user in the database
        var totalDifference;
        //loop through all the possibilities in the database 
        for (var i = 0; i < buddies.length; i++){
            var currentBuddy = buddies[i];
            totalDifference = 0;
            console.log(currentBuddy.name);

            // we then loop throuh all the scores
            for(var j = 0; j < currentBuddy.scores.length; j++){
                var currentBuddyScore = currentBuddy.scores[j];
                var currentUserScore = userScores[j];
                //calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentBuddyScore));
            }
            // if the sum of differences is less than the differences of the current "best match"
            if(totalDifference <= bestMatch.buddyDifference){
                // reset the bestMatch to be the new friend
                bestMatch.name = currentBuddy.name;
                bestMatch.photo = currentBuddy.photo;
                bestMatch.buddyDifference = totalDifference;
            }
            
        }
        // save the users data to the database
        buddies.push(userData);
        // return a json with the users bestMatch
        res.json(bestMatch);
    })
}