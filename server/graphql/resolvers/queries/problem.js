const Problem = require("../../../models/Problem");

module.exports = {
  Query: {
    getProblems: async (root, args, context, info) => {
      try {
        return await Problem.find().exec();
      } catch (err) {
        throw new Error(err);
      }
    },
    getProblem: async (root, args, context, info) => {
      try {
        let { id } = args;
        if (!id) {
          throw new Error("ID missing");
        }
        return await Problem.findById(id).exec();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
