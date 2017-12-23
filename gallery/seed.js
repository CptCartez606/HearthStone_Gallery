var unirest = require("unirest");
var mongoose = require("mongoose");
var Card = require("./models/card");



function seedDB()
{
    // These code snippets use an open-source library. http://unirest.io/nodejs
    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
    .header("X-Mashape-Key", "4Ek8tfDxYNmshN0p0hYT0XOufxW2p1Q3wTyjsnkM7DtZ3iMyF5")
    .end(function (request){
        
        //console.log(result);
        var data = request.body;
        
        //Removes all cards
        Card.remove({}, function(err){
            if(err){
                console.log(err);
            } else {
                console.log("removed cards");
                //Add cards
                for (var key in data){
                    Card.create(data[key],function(err, card){
                        if(err){
                            console.log(err);
                        } else {
                        console.log("added a card");
                        }
                    });
                }
            }
        });
    });
}

//exports function to app.js
module.exports = seedDB;