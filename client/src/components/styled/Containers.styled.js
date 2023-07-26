import { styled } from "styled-components";
import { Container } from "semantic-ui-react";
import { Link } from 'react-router-dom'

export const StyledContainer = styled(Container)`
display: flex !important;
flex-direction: column;
justify-content: center !important;
align-items: center !important;
/* height: 100vh !important; */
max-width: 100%;
overflow-x: hidden !important;
`;

//Change the name of this later
export const Junk = styled.div`
display: flex !important;
justify-content: center !important;
align-items: center !important;
height: 100vh ;
`;

export const DirectMessageContainer = styled(Container)`
display: flex !important;
justify-content: flex-end;
align-items: center !important;
width: 100% !important;
height: 25vh;
`;

export const AddfriendContainer = styled.div`
display: flex;
justify-content: space-between;
background-color: transparent;
padding: 15px;
`;

export const FriendsListContainer = styled.div`
display: flex;
justify-content: flex-start;
flex-direction: column;
align-items: center;
background-color: transparent;
`;

export const Username = styled.p`
background-color: transparent;
`;

export const NavbarContainer = styled.nav`
display: flex;
justify-content: space-evenly;
align-items: center;
border-style: solid;
background-color: #1B1C22;
position: fixed;
bottom: 0;
min-height: 9vh;
width: 100%;
`;

export const FriendsHeader = styled.header`
display: flex;
justify-content: space-evenly;
align-items: center;
padding-left: 19%;
padding-top: 10%;
padding-bottom: 10%;
text-align: center;
`;

export const AddFriend = styled.section`
display: flex;
justify-content: center;
padding-bottom: 10%;
flex-direction: column;
align-items: center;
`;

export const AddUserContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
padding-left: 5%;
`;

export const ButtonContainer = styled.div`
display: flex;
margin-top: 10%;
justify-content: center;
align-items: center;
`;

export const Linked = styled(Link)`
padding-right: 22%;
padding-left: 5px;
`;

export const FriendsList = styled.section`
display: flex;
background-color: #1B1C22;
align-items: center;
justify-content: flex-start;
padding-left: 20px;
`;