import { H2 } from "./styled/Headers.styled"
import { FriendsHeader, FriendsList } from "./styled/Containers.styled"
import { AdduserIcon } from "./styled/Icons.styled"
import { Link } from "react-router-dom"
import { Avatar } from "./styled/Images.styled"
import myImage from '../images/avatar-ga53cc9638_1280.png'
import { Name } from "./styled/Text.styled"

export default function Friends() {
    return (
        <>
        <FriendsHeader>
            <H2>Friends</H2>
            <Link to='/Addfriends'>
                <AdduserIcon name='add user' size='large'></AdduserIcon>
            </Link>
        </FriendsHeader>

        <FriendsList>
            <Avatar src={myImage} size="mini" avatar/>
            <Name>Name</Name>
        </FriendsList>
        </>
    )
}