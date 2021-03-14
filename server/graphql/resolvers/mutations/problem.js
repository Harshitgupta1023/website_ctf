const Problem = require("../../../models/Problem");
const ProblemValidator = require("../../validators/problemValidators");
const path = require("path");
const fs = require("fs");
const upload = require("../../upload/upload");

module.exports = {
  Mutation: {
    createProblem: async (root, args, { req }, info) => {
      if (!req.isAdmin) {
        throw new Error(
          "Unauthorized! You need admin priviliges to access this method"
        );
      }
      let { file, title, statement, solution, points, category, hints } = args;
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
        data["fileURL"] = await upload(file, "problemFiles");
      }
      const question = new Problem(data);
      return await question.save();
    },
    updateProblem: async (root, args, { req }, info) => {
      if (!req.isAdmin) {
        throw new Error(
          "Unauthorized! You need admin priviliges to access this method"
        );
      }
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
      const oldData = await Problem.findById(id);
      if (oldData) {
        let data = {};

        data["title"] = title ? title : oldData["title"];
        data["statement"] = statement ? statement : oldData["statement"];
        data["solution"] = solution ? solution : oldData["solution"];
        data["points"] = points ? points : oldData["points"];
        data["category"] = category ? category : oldData["category"];
        data["hints"] = hints ? hints : oldData["hints"];

        const validationResponse = await ProblemValidator.validate(data);
        if (validationResponse.error) {
          throw validationResponse.error;
        }
        if (file) {
          if (oldData["fileURL"]) {
            await removeFile(oldData["fileURL"]);
          }
          data["fileURL"] = await upload(file, "problemFiles");
        }
        for (i in data) {
          oldData[i] = data[i];
        }
        await oldData.save();
        return oldData;
      } else {
        throw new error("Not Found");
      }
    },
    deleteProblem: async (root, args, { req }, info) => {
      if (!req.isAdmin) {
        throw new Error(
          "Unauthorized! You need admin priviliges to access this method"
        );
      }
      let { id } = args;
      const data = (await Problem.findById(id)).toJSON();
      if (data.fileURL) {
        await removeFile(data.fileURL);
      }
      return await Problem.findByIdAndRemove(id);
    },
  },
};

const removeFile = (filePath) => {
  filePath = path.join(__dirname, "../../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
