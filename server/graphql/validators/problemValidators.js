const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(3).required(),
  statement: Joi.string().min(3).required(),
  solution: Joi.string().min(3).required(),
  points: Joi.number().min(1).max(1000).required(),
  category: Joi.array().items(Joi.string().min(3)).min(1),
  hints: Joi.array().items(Joi.string().min(3)),
});
