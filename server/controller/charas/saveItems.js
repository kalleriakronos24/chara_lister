const SaveItems = require('../../models/savedItems');


module.exports = async (req, res) => {

    try{
        const data = [];
        for(var x in req.body){
            data.push(req.body[x])
        }
        console.log(data);
        const request = req.body
        console.log(request);
        const save_chara = new SaveItems({
            by : '5dbc4237760587191851a3d9',
            characters : data
        })
        await save_chara.save();
        await res.status(200).send('OK')
    }
    catch(err){
        throw err;
    }

}