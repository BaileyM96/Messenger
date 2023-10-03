import { DirectMessageContainer, AddfriendContainer, FriendsListContainer, Username } from "./styled/Containers.styled";
import { DirectMessageCard, Friend } from "./styled/Cards.styled";
import { H3 } from "./styled/Headers.styled";
import { AdduserIcon } from "./styled/Icons.styled";
import { Avatar } from "./styled/Images.styled";
import myImage from '../images/avatar-ga53cc9638_1280.png'



export default function Homepage() {
    return (
        <>
        <DirectMessageContainer>
            <DirectMessageCard>
                <AddfriendContainer>
                    <H3>Direct Messages</H3>
                    <AdduserIcon name="add" size="large"></AdduserIcon>
                </AddfriendContainer>
                <FriendsListContainer>
                    <Friend>
                        <Avatar src={myImage} size="large"avatar/>
                        <Username>Username</Username>
                    </Friend>
                </FriendsListContainer>
            </DirectMessageCard>
        </DirectMessageContainer>
        </>
    )
}