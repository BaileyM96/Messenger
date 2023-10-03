import { styled } from "styled-components";
import { Card } from "semantic-ui-react";

export const DirectMessageCard = styled(Card)`
background-color: #1B1C22 !important;
width: 80% !important;
/* height: 95vh; */
margin-top: 10px !important;
`;

export const Friend = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
background-color: #343434;
border-radius: 5px;
width: 90%;
color: white;
margin-bottom: 15px;
padding: 6px;
`;