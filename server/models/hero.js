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
    passives : [{
        passive_name : String
    }],
    alive : {
        type : Boolean,
        required : true
    },
    race : {
        type: String,
        required : true
    },
    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    elements : [
        {
            element_name : String,
            icon : String
        }
    ],
    about : {
        type : String,
        required : true
    }

}, {
    timestamps: true
});

module.exports = mongo.model('Hero', HeroSchema);