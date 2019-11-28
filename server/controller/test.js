const Chara = require('../models/hero');


module.exports = async (req, res) => {

    try{
        const chara = await Chara.find({ name : req.params.name }).populate('creator')
        await res.status(200).send(chara)
        return chara;
    }
  
    catch(error) {
        console.log(error);
    }
}