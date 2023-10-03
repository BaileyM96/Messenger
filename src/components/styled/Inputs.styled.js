import { styled } from "styled-components";

export const Label = styled.label`
color: white !important;
`;

export const Input = styled.input`
background-color: #1B1C22 !important;
color: white !important;
height: 40px !important;
max-width: 100%;

&::placeholder {
    color: white !important;
}

&:focus {
    border-color: #DE17A5 !important;
    border-style: solid !important;
    border-width: 3px !important;
}
`;

export const AddUserInput = styled.input`
background-color: #1B1C22;
color: white;
height: 40px;
border-radius: 10px;
width: 95%;
padding-left: 10px;
align-items: center;

&:focus {
    border-color: #DE17A5;
    border-style: solid;
    border-width: 3px;
}
`;