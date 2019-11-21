const mongo = require('mongoose');

const Schema = mongo.Schema;

const skill = new Schema({
    skill_name : String
})

const HeroSchema = new Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },
    hp : {
        type : Number,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    sprite : {
        type : Array,
        required : true
    },
    mana : {
        type : Number,
        required : true
    }, 
    skills : {
        type : [skill],
        required : true
    },
    passives : {
        type : Array,
        required : true
    },
    alive : {
        type : Boolean,
        required : true
    },
    race : {
        type: Array,
        required : true
    },
    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

}, {
    timestamps: true
});

module.exports = mongo.model('Hero', HeroSchema);