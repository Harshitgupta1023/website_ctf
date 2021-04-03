const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");
const problem = require("./graphql/typeDefs/problem");
const user = require("./graphql/typeDefs/user");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs: [problem, user],
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
const app = express();
app.use("/uploads", express.static(__dirname));
app.use(isAuth);
server.applyMiddleware({ app });

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    return app.listen({ port: PORT });
  })
  .then(() => {
    console.log(`Server is ready at : ${PORT}`);
  })
  .catch((err) => console.log(err));
