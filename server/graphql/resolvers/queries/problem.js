const Problem = require("../../../models/Problem");
module.exports = {
  Query: {
    getProblems: async (root, args, { req }, info) => {
      return await Problem.find().exec();
    },
    getProblem: async (root, args, { req }, info) => {
      let { id } = args;
      if (!id) {
        throw new Error("ID missing");
      }
      return await Problem.findById(id).exec();
    },
    getProblemsByCategory: async (root, args, { req }, info) => {
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
    },
  },
};
