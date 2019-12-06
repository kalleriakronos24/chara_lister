const express = require("express");
const bodyParser = require("body-parser");
const GplHttp = require("express-graphql");
const app = new express();
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema");
const grapqlResolver = require("./graphql/resolver");
const PORT = process.env.PORT || 3005;
const hero_controller = require("./graphql/resolver/chara");
const save_item_controller = require('./controller/charas/saveItems')
const path = require('path');
const test = require('./controller/test');

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname + '/public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


app.use(
  "/data/api",
  GplHttp({
    schema: graphqlSchema.graphQLSchema,
    rootValue: grapqlResolver,
    graphiql: true
  })
);
app.use('/api_hero', hero_controller);
app.post('/api/save', save_item_controller.save);
app.get('/hero/:name', test)
app.post('/user/unsave', save_item_controller.unsave);

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);


mongoose
  .connect("mongodb://localhost/graphql-test")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Your app is now runnig on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
