const mongo = require('mongoose');

const Schema = mongo.Schema;

const HeroSchema = new Schema({

    name : {
        type : String
    },
    img : {
        type: String
    },
    hp : {
        type : Number
    },
    thumbnail : {
        type : String
    },
    sprite : [String],
    mana : {
        type : Number
    }, 
    skills : [{
        skill_name : String,
        description: String
    }],
    passives : [String],
    alive : {
        type : Boolean,
        required : true
    },
    race : [String],
    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

}, {
    timestamps: true
});

module.exports = mongo.model('Hero', HeroSchema);