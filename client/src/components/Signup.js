import { H1 } from "./styled/Headers.styled"
import { StyledForm, StyledDiv } from "./styled/Form.styled";
import { Label, Input } from "./styled/Inputs.styled";
import { StyledButton } from "./styled/Buttons.styled";
import { StyledContainer, Junk } from "./styled/Containers.styled";
export default function Signup() {
    return (
        <>
        {/* <H1>Sign up</H1> */}
        <Junk>
        <StyledContainer>
        <H1>Sign up</H1>
        <StyledForm>
            <StyledForm.Field>
                <Label>Email</Label>
                <Input placeholder='Email' 
                
                />
            </StyledForm.Field>

            <StyledForm.Field>
                <Label>Username</Label>
                <Input placeholder='Username' 
                
                />
            </StyledForm.Field>

            <StyledForm.Field>
                <Label>Password</Label>
                <Input placeholder='Password' 
                
                />
            </StyledForm.Field>

            <StyledButton>Create Profile</StyledButton>
        </StyledForm>
        </StyledContainer>
        </Junk>
        </>
    )
}