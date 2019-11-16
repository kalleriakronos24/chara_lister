const Hero = require("../../models/hero");
const Creator = require("../../models/user");
const path = require("path");
const multer = require('multer');
const express = require('express');
const router = express.Router()
const uuidv4 = require('uuid/v4');

      const DIR = './public/'

      const storage = multer.diskStorage({
          destination : (req, file, cb) => {
              cb(null, DIR);
          },
          filename : (req, file, cb) => {
              const filename = file.originalname.toLocaleLowerCase().split(' ').join('-');
              cb(null, uuidv4() + '-' + filename)
          }
      })

      var upload = multer({
        storage : storage,
        fileFilter : (req, file, cb) => {
            if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
                cb(null, true)
            }else{
                cb(null, false);
                return cb(new Error('Only .png, .jpg, .jpeg format allowed'))
            }
        }
      })

router.post('/add-new-hero', upload.array('thumbnail', 6), async (req, res, next) => {
    try{
        console.log(req.files);
    const reqFiles = [];
    const url = req.protocol + '://'+ req.get('host');
    for(var i = 0; i < req.files.length; i++){
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }

  const hero = new Hero(
    {
      name: req.body.hero_name,
      hp: req.body.hp,
      mana: req.body.mana,
      passives: req.body.passives,
      alive: true,
      sprite : reqFiles,
      race: req.body.race,
      creator: "5dbc4237760587191851a3d9"
    }
  );

  for (var x in req.body.skills) {
    hero.skills.push(req.body.skills[x]);
  }

  await hero.save();
  res.status(200).send("OK");

  const creator = await Creator.findById("5dbc4237760587191851a3d9");
  if (!creator) {
    throw new Error("Creator doesnt exist");
  }
  await creator.createdHero.push(hero);
  await creator.save();
}catch(err){
    console.log(err);
}
})

module.exports = router;
     