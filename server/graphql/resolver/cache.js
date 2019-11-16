const redis = require("redis");
const PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(PORT);

module.exports = {
  HeroCache: (req, res, next) => {
    try {
      const mykey = "sambadi";

      client.get(mykey, (error, result) => {
        const parsed_hero = JSON.parse(result);
        const arr = [];
      const mykey = "sambadi";
      const _string = JSON.stringify(heros);
      client.setex(mykey, 36000000, _string);
        const hero_obj = {
          _id: 0,
          name: "",
          skills: [
            {
              skill_name: ""
            }
          ]
        };
        arr.push(parsed_hero);

        arr.map(h => {
          Object.assign(arr, {
            _id: h._id,
            name: h.name,
            skills: [{ skill_name: h.skills }]
          });
        });
        console.log(arr);
        
        if (error) throw error;
        if (result !== null) {
          res.status(200).send(JSON.parse(result));
        } else {
          next();
        }
      });
    } catch (error) {}
  }
}