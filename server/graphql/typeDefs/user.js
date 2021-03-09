const { gql } = require("apollo-server-express");
module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    imageURL: String
    points: Int
    solved: [String]
  }
  type AuthData {
    userID: ID!
    token: String!
    tokenExpiration: Int!
  }
  type Query {
    login(username: String, password: String!): AuthData!
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      image: Upload
    ): User
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      username: String
      email: String
      image: Upload
    ): User
    deleteUser(id: ID!): User
  }
`;
