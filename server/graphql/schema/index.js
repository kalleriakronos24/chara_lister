const { buildSchema }  = require('graphql');

const _Hero = {
    'name' : String,
     'hp' : Number,
     'mana' : Number,
     'skills' : [],
     'passives' : [],
     'alive' : Boolean,
     'race' : []
} 
const random_object = {};

module.exports.graphQLSchema = buildSchema(`

type Hero {
    _id: ID!
    name: String
    hp: Int
    mana : Int
    sprite : [String]
    skills : [Skills]
    passives : [String]
    alive : Boolean
    race : String!
    creator : User!
    thumbnail : String
    about : String
    elements : [Elements]!
}
type SavedItems {
    _id : ID!
    characters : [Hero]
    by : User
}

type Elements{
    element_name : String!
}

type Skills{
    skill_name:String
    description:String
}

type User {
    _id : ID!
    name : String!
    contributor : [String]
    createdHero : [Hero!]
}
input UserInput {
    name : String!
    contributor : [String]
}

input Skill{
    skill_name : String
}

input addHero {
    name: String
    hp: Int
    mana : Int
    sprite : [String]
    skills : [Skill]
    passives : [String]
    alive : Boolean
    race : [String]
}

type RootQuery {
    Heros: [Hero!]!
    Users: [User!]!
    getUser(get: ID!): User
    getHero(get: String!): Hero
}

type RootMutation {
    createHero(name : String, hp : Int, mana : Int, skills : [Skill], passives : [String], alive : Boolean, race : [String]): Hero
    createUser(UserInput: UserInput): User
    saveChara(get : ID!): Hero
} 

schema {
    query: RootQuery
    mutation: RootMutation
}`)