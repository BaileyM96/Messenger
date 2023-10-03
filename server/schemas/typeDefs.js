const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    email: String!
    password: String!
    userName: String
    friends: [User]
}

type FriendRequest {
    _id: ID!
    from: User!
    status: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]!
    user(email: String, userName: String): User
    me: User
    pendingFriendRequests: [FriendRequest]
}

type Mutation {
    createUser(email: String!, password: String!, userName: String!): Auth
    login (email: String!, password: String!): Auth
    addFriend(userName: String, friendUserName: String): User
    sendFriendRequest(friendUserName: String): User
    acceptFriendRequest(requesterId: ID!): User
    declineFriendRequest(requesterId: ID!): User
}
`;

module.exports = typeDefs;