const Hero = require("../../models/hero");
const Creator = require("../../models/user");
const path = require("path");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid/v4");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + filename);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg format allowed"));
    }
  }
});

router.post(
  "/add-new-hero",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "sprite", maxCount: 4 }
  ]),
  async (req, res, next) => {
    try {
      console.table(req.body);
      console.log(req.files);
      console.log(req.files["thumbnail"][0].filename);

      const sprites = [];
      const url = req.protocol + "://" + req.get("host");
      for (var i = 0; i < req.files["sprite"].length; i++) {
        sprites.push(url + "/public/" + req.files["sprite"][i].filename);
      }

      const thumb =
        req.protocol +
        "://" +
        req.get("host") +
        "/public/" +
        req.files["thumbnail"][0].filename;

      const hero = new Hero({
        name: req.body.hero_name,
        hp: req.body.hp,
        mana: req.body.mana,
        passives: req.body.passives,
        about: req.body.about,
        alive: true,
        thumbnail: thumb,
        sprite: sprites,
        race: req.body.race,
        creator: "5dbc4237760587191851a3d9"
      });

      for (var i in req.body.skills) {
        hero.skills.push(JSON.parse(req.body.skills[i]));
      }

      await hero.save();

      res.status(200).send("OK");

      const creator = await Creator.findById("5dbc4237760587191851a3d9");
      if (!creator) {
        throw new Error("Creator doesnt exist");
      }
      await creator.createdHero.push(hero);
      await creator.save();
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
