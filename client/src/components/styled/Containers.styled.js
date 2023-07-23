import { styled } from "styled-components";
import { Container } from "semantic-ui-react";

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