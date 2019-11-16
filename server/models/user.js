const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({

    name : String,

    contributor : [String],

    createdHero : [{
        type: Schema.Types.ObjectId,
        ref : 'Hero'
    }]
})

module.exports = mongoose.model('User', UserSchema);