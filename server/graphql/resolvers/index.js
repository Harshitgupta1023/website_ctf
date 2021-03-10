const problemQuery = require("./queries/problem");
const problemMutations = require("./mutations/problem");
const userMutations = require("./mutations/user");
const userQuery = require("./queries/user");
module.exports = {
  Query: {
    ...problemQuery.Query,
    ...userQuery.Query,
  },
  Mutation: {
    ...problemMutations.Mutation,
    ...userMutations.Mutation,
  },
};
