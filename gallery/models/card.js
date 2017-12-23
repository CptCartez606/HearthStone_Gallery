var mongoose = require("mongoose");
 
// SCHEMA SETUP
var cardSchema = new mongoose.Schema({
    cardId: String,
    dbfId: String,
    name: String,
    cardSet: String,
    type: String,
    faction: String,
    rarity: String,
    cost : Number,
    attack: Number,
    health: Number,
    text: String,
    flavor: String,
    artist: String,
    collectible: Boolean,
    race: String,
    playerClass: String,
    img: String,
    imgGold: String,
    locale: String
});

module.exports = mongoose.model("Card", cardSchema);