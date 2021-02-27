const problemQuery = require("./queries/problem");
const problemMutations = require("./mutations/problem");

module.exports = {
  Query: {
    ...problemQuery.Query,
  },
  Mutation: {
    ...problemMutations.Mutation,
  },
};
