import { FriendsHeader, AddFriend, AddUserContainer, ButtonContainer, Linked } from "./styled/Containers.styled"
import { H3, H2 } from "./styled/Headers.styled"
import { Closebutton, StyledButton } from "./styled/Buttons.styled"
import { MessageTitle } from "./styled/Text.styled"
import { Input, AddUserInput } from "./styled/Inputs.styled";


export default function Addfriends() {
    return (
        <>
        <FriendsHeader>
            <Linked to='/Friends'>
                <Closebutton>Close</Closebutton>
            </Linked>
            <H3>Add Friend</H3>
        </FriendsHeader>

        <AddFriend>
            <H2>Add your friend!</H2>
            <MessageTitle>You can add friends with their username. </MessageTitle>
        </AddFriend>

        <AddUserContainer>
            <MessageTitle>ADD VIA USERNAME</MessageTitle>
            <AddUserInput placeholder="Username"></AddUserInput>
        </AddUserContainer>

        {/* Need to understand how to send a user a request */}
        <ButtonContainer>
            <StyledButton>Send Friend Request</StyledButton>
        </ButtonContainer>
        </>
    )
}