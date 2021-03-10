const Problem = require("../../../models/Problem");

module.exports = {
  Query: {
    getProblems: async (root, args, { req }, info) => {
      try {
        return await Problem.find().exec();
      } catch (err) {
        const error = new Error(err);
        error.message = "Could not find problem";
        throw error;
      }
    },
    getProblem: async (root, args, { req }, info) => {
      try {
        let { id } = args;
        if (!id) {
          throw new Error("ID missing");
        }
        return await Problem.findById(id).exec();
      } catch (err) {
        const error = new Error(err);
        error.message = "Could not find problem";
        throw error;
      }
    },
    getProblemsByCategory: async (root, args, { req }, info) => {
      try {
        let { category } = args;
        category = category.toLowerCase();
        let data = await Problem.find().exec();
        let out = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].category.includes(category)) {
            out.push(data[i]);
          }
        }
        return out;
      } catch (err) {
        const error = new Error(err);
        error.message = "Could not find problem";
        throw error;
      }
    },
  },
};
