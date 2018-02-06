require("dotenv").config();

// linking to the api key files
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

//Used to import the client library for the Twitter
var Twitter = require('twitter');


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
  spotify();
    break;
}

// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
// If the "tweets" function is called...
function tweets() {

        var client = new Twitter(keys.twitter);
      
        var params = {screen_name: 'pak_attk', count: 20};
        
        client.get('statuses/user_timeline', params, function(
          error,
          tweets,
          response
        ) {
          if (!error) {
            var data = []; //empty array to hold data
            for (var i = 0; i < tweets.length; i++) {
              data.push({
                'Date and time of post: ': tweets[i].created_at,
                'The Tweet: ': tweets[i].text,
              });
            }
            console.log(data);
          }
        });
      };
    

function spotify() {

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify)
 
    spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
    // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        // returning artist name
        console.log(data.tracks.items[0].artists[0].name);

        // returning song's name 
        console.log(data.tracks.items[0].name);
        
        // returning preview link of the song from Spotify
        console.log(data.tracks.items[0].preview_url);
        
        // returning album that the song is from
        console.log(data.tracks.items[0].album.name);        
            });
    };


    
    //  FIRST TRY -----
    
    // request("https://api.twitter.com/1.1/search/tweets.json?q=" +value, 
    // function (error, response, body) {

    //    const obj = JSON.parse(body);
    // //    const year = +obj.Year;

    //     // console.log(body);
    //     // console.log(obj.Title);
    //     console.log(obj);
        

        // SECOND TRY  -----

        // if (userYear > year) {
        //     console.log("Before my time doggie")
        // } else {
        //     console.log("old af");
        // }
        


// });

//   // We will read the existing bank file
//   fs.readFile("bank.txt", "utf8", function(err, data) {
//     if (err) {
//       return console.log(err);
//     }

//     // Break down all the numbers inside
//     data = data.split(", ");
//     var result = 0;

//     // Loop through those numbers and add them together to get a sum.
//     for (var i = 0; i < data.length; i++) {
//       if (parseFloat(data[i])) {
//         result += parseFloat(data[i]);
//       }
//     }

//     // We will then print the final balance rounded to two decimal places.
//     console.log("You have a total of " + result.toFixed(2));
//   });
// }

// // If the "Deposit" function is called...
// function deposit() {

//   // We will add the value to the bank file.
//   fs.appendFile("bank.txt", ", " + value, function(err) {
//     if (err) {
//       return console.log(err);
//     }
//   });

//   // We will then print the value that was added (but we wont print the total).
//   console.log("Deposited " + value + ".");
// }

// // If the "Withdraw" function is called
// function withdraw() {

//   // We will add a negative value to the bank file.
//   fs.appendFile("bank.txt", ", -" + value, function(err) {
//     if (err) {
//       return console.log(err);
//     }
//   });

//   // We will then print the value that was subtracted (but we wont print the total).
//   console.log("Withdrew " + value + ".");
// }



//     // And tell the user the amount was added.
//     console.log("Congrats you won the lottery!");

//   // Otherwise we will tell them they lost 25 cents.
//   }
//   else {
//     console.log("Sorry. You just lost 25 cents. Maybe you should get a job instead.");
//   }
// }
