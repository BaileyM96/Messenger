import { StyledButton } from './styled/Buttons.styled';
import { Label, Input } from './styled/Inputs.styled';
import { StyledForm, StyledDiv } from './styled/Form.styled';

export default function Login() {
    return (
        <StyledDiv>
        <StyledForm>
            <StyledForm.Field>
                <Label>Username</Label>
                <Input placeholder='Username'></Input>
            </StyledForm.Field>
            <StyledForm.Field>
                <Label>Password</Label>
                <Input placeholder='Password'></Input>
            </StyledForm.Field>
            <StyledButton type='Login'>Login</StyledButton>
        </StyledForm>
        </StyledDiv>      
    )
}