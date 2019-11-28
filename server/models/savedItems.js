const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedItems = new Schema({
    by : {
      type : Schema.Types.ObjectId,
      ref : 'User'  
    },
    characters :[{
        type   : Schema.Types.ObjectId,
        ref : 'Hero'
    }]
}, {
    timestamps : true
})

module.exports = mongoose.model('SavedItems', SavedItems);