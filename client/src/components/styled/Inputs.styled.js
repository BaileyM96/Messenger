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