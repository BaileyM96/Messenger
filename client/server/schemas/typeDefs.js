const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    email: String!
    password: String!
    userName: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]!
    user(email: String!): User
    me: User
}

type Mutation {
    createUser(email: String!, password: String!, userName: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;