const Problem = require("../../../models/Problem");
const ProblemValidator = require("../../validators/problemValidators");

module.exports = {
  Mutation: {
    createProblem: async (root, args, context, info) => {
      try {
        const validationResponse = await ProblemValidator.validate(args);
        if (validationResponse.error) {
          throw validationResponse.error;
        }
        const question = new Problem(args);
        return await question.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProblem: async (root, args, context, info) => {
      try {
        let { id, title, statement, solution, points, category, hints } = args;
        const oldData = (await Problem.findById(id)).toJSON();
        if (oldData) {
          let data = {};
          if (title) {
            data["title"] = title;
          } else {
            data["title"] = oldData["title"];
          }
          if (statement) {
            data["statement"] = statement;
          } else {
            data["statement"] = oldData["statement"];
          }
          if (solution) {
            data["solution"] = solution;
          } else {
            data["solution"] = oldData["solution"];
          }
          if (points) {
            data["points"] = points;
          } else {
            data["points"] = oldData["points"];
          }
          if (category) {
            data["category"] = category;
          } else {
            data["category"] = ["category"];
          }
          if (hints) {
            data["hints"] = hints;
          } else {
            data["hints"] = oldData["hints"];
          }
          const validationResponse = await ProblemValidator.validate(data);
          if (validationResponse.error) {
            throw validationResponse.error;
          }
          await Problem.findByIdAndUpdate(id, { $set: data });
          return await Problem.findById(id);
        } else {
          throw new error("Not Found");
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
