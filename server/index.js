const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");
const problem = require("./graphql/typeDefs/problem");
const resolvers = require("./graphql/resolvers/index");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({ typeDefs: [problem], resolvers });
const app = express();

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
