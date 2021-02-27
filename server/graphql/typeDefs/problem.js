const { gql } = require("apollo-server");

module.exports = gql`
  type Problem {
    id: ID!
    title: String!
    statement: String!
    solution: String!
    points: Int!
    hints: [String]
    category: [String]!
    submissions: Int
    accepted: Int
  }

  type Query {
    getProblems: [Problem]
    getProblem(id: ID!): Problem
  }
  type Mutation {
    createProblem(
      title: String!
      statement: String!
      solution: String!
      points: Int!
      hints: [String]
      category: [String]!
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
    ): Problem
  }
`;
