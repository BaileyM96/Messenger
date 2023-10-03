import { FriendsHeader, AddFriend, AddUserContainer, ButtonContainer, Linked } from "./styled/Containers.styled"
import { H3, H2 } from "./styled/Headers.styled"
import { Closebutton, StyledButton } from "./styled/Buttons.styled"
import { MessageTitle } from "./styled/Text.styled"
import { AddUserInput } from "./styled/Inputs.styled";
import { SEND_FRIEND_REQUEST } from "../utils/mutations";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import UserContext from "./UserContext";
import { Message } from "semantic-ui-react";




export default function Addfriends() {
    const { userName } = useContext(UserContext);
    const [addFriendInput, setAddFriendInput] = useState('');
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);
    const [requestSentMessage, setRequestSentMessage] = useState('');


    const handleAddFriend = async () => {
        try {
            const { data } = await sendFriendRequest({ variables: { userName: userName, friendUserName: addFriendInput } });
            setRequestSentMessage('Friend Request Succesfully Sent!');
            setAddFriendInput('');
            setTimeout(() => {
                setRequestSentMessage('');
            }, 5000);
            console.log('data:', data);
            console.log('friend request sent!:', data);
        } catch (error) {
            console.error('Error adding friend:', error);
            setRequestSentMessage('Failed to send friend request');
        }
    }


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
            <AddUserInput 
            placeholder="Username"
            value={addFriendInput}
            onChange={(e) => setAddFriendInput(e.target.value)}
            />
        </AddUserContainer>

        <ButtonContainer>
            <StyledButton onClick={handleAddFriend}>Send Friend Request</StyledButton>
        </ButtonContainer>
        {requestSentMessage && (
            <Message positive>
                <Message.Header>{requestSentMessage}</Message.Header>
            </Message>
        )}
        </>
    )
}