const { gql } = require("apollo-server-express");
module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    imageURL: String
    points: Int
    verified: Boolean
    verificationOTP: OTP
    forgotPassOTP: OTP
    solvedProblems: [String]
  }
  type OTP {
    code: Int
    count: Int
    expTime: Int
  }
  type Query {
    login(username: String, password: String!): User!
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      image: Upload
    ): User!
    updateUser(id: ID!, username: String, email: String, image: Upload): User!
    updatePassword(id: ID!, oldPassword: String!, newPassword: String!): User!
    login(username: String, password: String!): User!
    sendForgotPassOTP(username: String!, email: String!): User!
    sendVerificationOTP(id: ID!): User!
    forgotPassword(
      username: String!
      email: String!
      OTP: Int!
      newPassword: String!
    ): User!
    verifyAccount(id: ID!, OTP: Int!): User!
    deleteUser(id: ID!): User
    googleLogin(id_token: String!): User!
    githubLogin(code: String!): User!
    makeSubmission(id: ID!, problemID: ID!, submission: String): User!
    logOut(id: ID!): String!
  }
`;
