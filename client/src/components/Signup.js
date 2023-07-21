import { H1 } from "./styled/Headers.styled"
import { StyledForm } from "./styled/Form.styled";
import { Label, Input } from "./styled/Inputs.styled";
import { StyledButton } from "./styled/Buttons.styled";
import { StyledContainer, Junk } from "./styled/Containers.styled";
import Auth from '../utils/auth';
//TODO import useState
import { useState } from "react";
//TODO import useMutation
import { useMutation } from '@apollo/client';
//import the CREATE USER mutation
import { CREATE_USER } from "../utils/mutations";


export default function Signup() {
    //Create state
    const [signupForm, setSignupForm] = useState({
        email: '',
        userName: '',
        password: '',
    });


    const [createUser, { error, data }] = useMutation(CREATE_USER);

    //TODO Handle the input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupForm({...signupForm, [name]: value,
        });
    };

    //TODO Handle the button click to submit the form 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(signupForm);

        try {
            const { data } = await createUser({
                variables: {...signupForm},
            });

                Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <>
        <Junk>
        <StyledContainer>
        <H1>Sign up</H1>
        <StyledForm>
            <StyledForm.Field>
                <Label>Email</Label>
                <Input 
                placeholder='Email' 
                value={signupForm.email}
                onChange={handleInputChange}
                name="email"
                type="email"
                required
                />
            </StyledForm.Field>

            <StyledForm.Field>
                <Label>Username</Label>
                <Input 
                placeholder='Username' 
                value={signupForm.userName}
                onChange={handleInputChange}
                name="userName"
                type="Text"
                required
                />
            </StyledForm.Field>

            <StyledForm.Field>
                <Label>Password</Label>
                <Input 
                placeholder='Password'
                value={signupForm.password}
                onChange={handleInputChange}
                name="password"
                type="password"
                required 
                />
            </StyledForm.Field>

            <StyledButton onClick={handleFormSubmit}>Create Profile</StyledButton>
        </StyledForm>
        </StyledContainer>
        </Junk>
        </>
    )
}