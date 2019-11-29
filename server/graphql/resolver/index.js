const Hero = require("../../models/hero");
const User = require("../../models/user");
const SaveItems = require('../../models/savedItems');

const MappedHero = hero => {
  return {
    ...hero._doc,
    skills : hero._doc.skills,
    elements : hero._doc.elements
  };
};
const MappedUser = user => {
  return {
    ...user._doc,
    createdHero : user._doc.createdHero,
    savedHero : user._doc.savedHero
  };
};

module.exports = {
  // get Single Object //
  getUser: async args => {
    try {
      const users = await User.findById({ _id: args.get }).populate(
        "createdHero savedHero"
      );
      return MappedUser(users);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getHero: async args => {
    try {
      let obj;
      const heros = await Hero.find({ name: args.get }).populate("creator")
      .then(res => {
        const data = res[0];
        obj = data; 
      })
      .catch(error => {
        throw error;
      })
      return obj;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // end of get Single Object //

  // Fetch all //
  Heros: async () => {
    try {
      const heros = await Hero.find({}).populate("creator");
      await heros.sort((a, b) => {
        return (
          heros.indexOf(a.name.toUpperCase()) - heros.indexOf(b.name.toUpperCase())
        );
      });
      return await heros.map(hero => {
        console.log(hero);
        return MappedHero(hero);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  Users: async () => {
    try {
      const users = await User.find({}).populate("createdHero");
      return users.map(user => {
        return MappedUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  // end of Fetch All //

  // Create //
  createHero: async args => {
    try {
      const hero = new Hero({
        name: args.name,
        hp: args.hp,
        mana: args.mana,
        passives: args.passives,
        alive: true,
        race: args.race,
        creator: "5dbc4237760587191851a3d9"
      });

      for (var x in args.skills) {
        hero.skills.push(args.skills[x]);
      }

      let createdHeros;
      const result = await hero.save();

      createdHeros = MappedHero(result);
      const creator = await User.findById("5dbc4237760587191851a3d9");
      if (!creator) {
        throw new Error("Creator Not Found");
      }
      creator.createdHero.push(hero);
      creator.save();
      return createdHeros;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createUser: async args => {
    try {
      const user_ = new User({
        name: args.UserInput.name,
        contributor: args.UserInput.contributor
      });
      await user_.save();
      return MappedUser(user_);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  saveChara : async args => {
    try {
    }
    catch(err){
      throw err;
    }
  }
  // end of Create //
};
