## Chara Lister v0.1

**What's this ?**
  > Just a simple chara lister ( Granblue Fantasy ) made with MERN Stack
  
 **This App Contains**
  - React.js
  - Node.js
  - Express.js
  - Redis Caching
  - MongoDB 
  - GraphQL and REST API
  
  **How to use ?**
  First of all u need to Install
  - run ``npm install`` to install all dependencies
  - Redis [For Windows](https://github.com/dmajkic/redis/downloads) ~~this is optional because by default i turned off the caching system~~
  - [Robo Mongo 3T](https://robomongo.org/) or u can use Mongo DB Atlas ~~go to server folder and look for mongodb url in index.js change it with your own~~
  - Make sure MongoDB installed in your Computer
  - Open 2 Command Line one for Client and the other one for server, open the path for client and type ``npm run start`` also dun forget to start the server too @ server folder type ``npm run server``
  - open ``localhost:3000`` for client and ``localhost:3005/data/api`` GraphQL Playground ( Server API ) in your browser
  - If u want to change Backend Logic u can do it in ``server\graphql\resolvers``
  
  **Preview ?**
  - No Preview
