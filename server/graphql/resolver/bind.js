const _heros = async hero_id => {
    try{
        const heros = await Hero.find({ _id : { $in : hero_id }})
           heros.sort((a, b) => {
               return (
                   hero_id.indexOf(a._id.toString()) - hero_id.indexOf(b._id.toString())
               )
           })
           return heros.map(hero => {
               return transformedHero(hero);
           })
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

const _user = async user_id => {
    try{
        const users = await User.findById(user_id);
        return {
            ...users._doc,
            createdHero : _heros.bind(this, users.createdHero)
        }
    }
    catch(err) {
        throw err;
    }
}