import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
            email
            password
        }
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($email: String!, $userName: String!, $password: String!) {
    createUser(email: $email, userName: $userName, password: $password) {
        token
        user {
            _id
            email
            password
            userName
        }
    }
}
`;

//Might remove the ADD_FRIEND later if new mutation works
export const ADD_FRIEND = gql`
mutation addFriend($userName: String, $friendUserName: String) {
    addFriend(userName: $userName, friendUserName: $friendUserName) {
        _id
        userName
        friends {
            _id 
            userName
        }
    }
}
`;

export const SEND_FRIEND_REQUEST = gql`
mutation sendFriendRequest($friendUserName: String) {
    sendFriendRequest(friendUserName: $friendUserName) {
        _id
        userName
    }
}
`;

export const ACCEPT_FRIEND_REQUEST = gql`
mutation AcceptFriendRequest($requesterId: ID!) {
    acceptFriendRequest(requesterId: $requesterId) {
        _id
        userName
        friends {
            _id
            userName
        }
    }
}
`;

export const DECLINE_FRIEND_REQUEST = gql`
mutation DeclineFriendRequest($requesterId: ID!) {
    declineFriendRequest(requesterId: $requesterId) {
        _id
        userName
        friends {
            _id
            userName
        }
    }
}
`;
