import { StyledButton } from './styled/Buttons.styled';
import { Label, Input } from './styled/Inputs.styled';
import { StyledForm } from './styled/Form.styled';
import { StyledContainer, Junk } from './styled/Containers.styled';
import { StyledDivider } from './styled/Dividers.styled';
import { H1 } from './styled/Headers.styled';
import { Message } from 'semantic-ui-react';


//Set form changes
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

//Link the signup page to the login page
import { Link } from 'react-router-dom';




//Hanldle the input changes on the page
export default function Login() {
const [formState, setFormState] = useState({ email: '', password: '' });
//For errors when logging in
const [credentialError, setCredentialError] = useState('');
const [login, { error, loginData }] = useMutation(LOGIN);

//Handle the form submission
const handleInput = (e) => {
    //destructure the value of the input field
    const { name, value } = e.target;
    //Create a object that has all the properties of the form state
    setFormState({
        ...formState,
        [name]: value,
    });

    
};


// Create submit logic
const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
        const { data: loginData } = await login({
            variables: { ...formState },
        })

        Auth.login(loginData.login.token);
        //Possibly find a better way to navigate to the homepage
        window.location.href = '/Homepage'
    } catch (e) {
        console.error(e)
        //set the login error with the message
        setCredentialError(e);
        console.log(credentialError)
    };
}


    return (
        <Junk>
        <StyledContainer>
            <H1>Login</H1>
        <StyledForm>
            <StyledForm.Field>
                <Label>Email</Label>
                <Input 
                value={formState.email} 
                onChange={handleInput}  
                name='email' 
                type='email' 
                placeholder='Email' 
                required>
                </Input>
            </StyledForm.Field>


            <StyledForm.Field>
                <Label>Password</Label>
                <Input 
                placeholder='Password'
                value={formState.password}
                onChange={handleInput}
                name='password'
                type='password'
                required
                ></Input>
            </StyledForm.Field>
            <StyledButton onClick={handleSubmit} type='Login'>Login</StyledButton>

            {credentialError && (
                <Message 
                negative
                header='invalid email or password'
                content={credentialError}
                />
            )}
            <StyledDivider horizontal>Or</StyledDivider>
            <Link to='/Signup'>Dont have an account? Sign up here.</Link>
        </StyledForm>
        </StyledContainer>
        
        </Junk>      
    )
}