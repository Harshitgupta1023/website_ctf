const { gql } = require("apollo-server-express");

module.exports = gql`
  type Problem {
    id: ID!
    title: String!
    statement: String!
    solution: String!
    fileURL: String
    points: Int!
    hints: [String]
    category: [String]!
    submissions: Int
    accepted: Int
  }

  extend type Query {
    getProblems: [Problem]
    getProblem(id: ID!): Problem
    getProblemsByCategory(category: String!): [Problem]
  }
  extend type Mutation {
    createProblem(
      title: String!
      statement: String!
      solution: String!
      points: Int!
      hints: [String]
      category: [String]!
      file: Upload
    ): Problem
    deleteProblem(id: ID!): Problem
    updateProblem(
      id: ID!
      title: String
      statement: String
      solution: String
      points: Int
      hints: [String]
      category: [String]
      file: Upload
    ): Problem
  }
`;
