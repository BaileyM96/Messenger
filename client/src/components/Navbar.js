import { NavbarContainer } from "./styled/Containers.styled"
import { HomeIcon, AdduserIcon } from "./styled/Icons.styled"
import { Avatar } from "./styled/Images.styled"
import myImage from '../images/avatar-ga53cc9638_1280.png'
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <>
        <NavbarContainer>
            <Link to='/Homepage'>
                <HomeIcon name='home' size='large'></HomeIcon>
            </Link>
            <Link to='/AddFriend'>
                <AdduserIcon name='add user' size='large'></AdduserIcon>
            </Link>
            <Avatar src={myImage} avatar />
        </NavbarContainer>
        </>
    )
}