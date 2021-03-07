const Problem = require("../../../models/Problem");
const ProblemValidator = require("../../validators/problemValidators");
const path = require("path");
const fs = require("fs");
const upload = require("../../upload/upload");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

module.exports = {
  Mutation: {
    createProblem: async (root, args, context, info) => {
      try {
        let {
          file,
          title,
          statement,
          solution,
          points,
          category,
          hints,
        } = args;
        if (category) {
          for (var i = 0; i < category.length; i++) {
            category[i] = category[i].toLowerCase();
          }
        }
        let data = {
          title: title,
          statement: statement,
          solution: solution,
          points: points,
          category: category,
          hints: hints,
        };
        const validationResponse = await ProblemValidator.validate(data);
        if (validationResponse.error) {
          throw validationResponse.error;
        }
        if (file) {
          data["fileURL"] = await upload(file);
        }
        const question = new Problem(data);
        return await question.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProblem: async (root, args, context, info) => {
      try {
        let {
          id,
          title,
          statement,
          solution,
          points,
          category,
          hints,
          file,
        } = args;
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
          if (file) {
            if (oldData["fileURL"]) {
              await removeFile(oldData["fileURL"]);
            }
            data["fileURL"] = await upload(file);
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
        const data = (await Problem.findById(id)).toJSON();
        if (data.fileURL) {
          await removeFile(data.fileURL);
        }
        return await Problem.findByIdAndRemove(id);
      } catch {
        throw new Error(err);
      }
    },
  },
};

const removeFile = (filePath) => {
  filePath = path.join(__dirname, "../../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
