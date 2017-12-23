var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    Card        = require("./models/card"),
    seedDB      = require("./seed");
    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/hearth_db", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//This will remove all the Cards from the database and then add them again
//seedDB();

var sets = [
                "Basic",
                "Classic",
                "Tavern Brawl",
                "Naxxramas",
                "Goblins vs Gnomes",
                "Blackrock Mountain",
                "The Grand Tournament",
                "The League of Explorers",
                "Whispers of the Old Gods",
                "One Night in Karazhan",
                "Mean Streets of Gadgetzan",
                "Hall of Fame",
                "Journey to Un'Goro",
                "Knights of the Frozen Throne"
            ];

var playerClass = [
                "Neutral",
                "Death Knight",
                "Druid",
                "Hunter",
                "Mage",
                "Paladin",
                "Priest",
                "Rogue",
                "Shaman",
                "Warlock",
                "Warrior"
            ];
            
//HOME PAGE
app.get("/", function(req,res)
{
    res.render("landing");
});

//Show Set of Cards
app.get("/:setId/:playerId/cards", function(req,res){
    Card.find({}, function(err, allCards){
        if(err){
            console.log(err);
        } else {
            //set to var beecause syntax issue
            var idSet = req.params.setId;
            var idPlayer = req.params.playerId;
            res.render('index', {cards:allCards , idSet, idPlayer, sets, playerClass });
        }
    });
});

//Specific Card
app.get("/:setId/:playerId/cards/:cardId", function(req, res){
  Card.findById(req.params.cardId, function(err, allCards){
      if(err){
          res.redirect("/cards");
      } else {
          res.render("show", {cards: allCards});
      }
  });
});

app.listen(process.env.PORT, process.env.IP, function()
{
   console.log("The HearthStone Gallery Server has started"); 
});