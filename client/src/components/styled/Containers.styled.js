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