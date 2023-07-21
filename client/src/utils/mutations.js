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