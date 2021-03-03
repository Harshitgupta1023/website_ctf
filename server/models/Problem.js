const { Schema, model } = require("mongoose");

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    statement: {
      type: String,
      required: true,
    },
    fileURL: String,
    solution: {
      type: String,
      required: true,
    },
    category: {
      required: true,
      type: Array,
    },
    points: {
      type: Number,
      required: true,
    },
    hints: [
      {
        type: String,
      },
    ],
    submissions: {
      type: Number,
      default: 0,
    },
    accepted: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Problem", problemSchema);
