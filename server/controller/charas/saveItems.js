const SaveItems = require('../../models/user').User;


module.exports.save = async (req, res) => {

    try{
        const data = [];
        for(var x in req.body){
            data.push(req.body[x])
        }

        const save_chara = await SaveItems.updateOne({ _id : '5dbc3b6706e1362294c87c6f' }, {
            $addToSet : {
                "savedHero" : data
            }
        })
        await res.status(200).send('OK')
    }
    catch(err){
        throw err;
    }

}  

module.exports.unsave = async (req, res) => {
    
    try{
        const query = await SaveItems.findById(req.body.user_id);

        const filtered_saved_char = query.savedHero.filter(s => s.toString() !== req.body.saved_id);

        const query_2 = await SaveItems.updateOne({ _id : req.body.user_id }, 
            {
                savedHero : filtered_saved_char
            }, (err, result) => {
                console.log('error', err);
                console.log('result', result);
            })
        return query_2;
    }
    catch(err){
        throw err;
    }
}