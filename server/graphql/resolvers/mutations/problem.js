const Problem = require("../../../models/Problem");

module.exports = {
  Mutation: {
    createProblem: async (root, args, context, info) => {
      try {
        const question = new Problem(args);
        return await question.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProblem: async (root, args, context, info) => {
      try {
        let { id, title, statement, solution, points, category, hints } = args;
        if (Problem.findById(id)) {
          let data = {};
          if (title) {
            data["title"] = title;
          }
          if (statement) {
            data["statement"] = statement;
          }
          if (solution) {
            data["solution"] = solution;
          }
          if (points) {
            data["points"] = points;
          }
          if (category) {
            data["category"] = category;
          }
          if (hints) {
            data["hints"] = hints;
          }
          return await Problem.findByIdAndUpdate(id, { $set: data });
        } else {
          throw new error("Error 404! Not Found");
        }
      } catch {
        throw new Error(err);
      }
    },
    deleteProblem: async (root, args, context, info) => {
      try {
        let { id } = args;
        return await Problem.findByIdAndRemove(id);
      } catch {
        throw new Error(err);
      }
    },
  },
};
