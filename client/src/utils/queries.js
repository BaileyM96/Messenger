import { gql } from '@apollo/client';

export const QUERY_ME = gql `
query me {
    me {
        _id 
        userName
    }
}
`;

export const QUERY_USER = gql `
query user($userName: String) {
    user(userName: $userName) {
        friends {
            _id
            userName
        }
    }
}
`;

export const GET_PENDING_FRIEND_REQUESTS = gql`
query PendingFriendRequests {
    pendingFriendRequests {
        _id
        from {
            _id
            userName
        }
        status
    }
}
`;
