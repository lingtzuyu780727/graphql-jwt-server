import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    signup(
      account: String!
      name: String!
      password: String!
      birth: String!
    ): AuthPayload!
    login(account: String!, password: String!): AuthPayload!
  }

  type User {
    account: String!
    name: String!
    birth: String!
  }

  type AuthError {
    msg: String!
  }

  type AuthPayload {
    AuthError: [AuthError!]!
    token: String
  }
`;
