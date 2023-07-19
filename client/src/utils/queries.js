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
query user ($email: String!) {
    user(email: $userName) {
        _id
        userName
    }
}
`;