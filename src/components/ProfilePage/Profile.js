import { ProfileHeader, ProfileName } from "./Profile.styled";
import { SettingsContainer } from "../SettingsMenu/Settings.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Settings from "../SettingsMenu/Settings";


export default function Profile() {
    const [openMenu, setOpenMenu] = useState(false);

    function handleMenu() {
        setOpenMenu(prevState => !prevState);
    }

    return (
        <>
        <ProfileHeader>
            <ProfileName>User Name</ProfileName>
            <FontAwesomeIcon 
            style={{color: 'white'}} 
            icon={faBars} 
            size="2xl" 
            onClick={handleMenu} 
            />
        </ProfileHeader>

        <SettingsContainer>
            {openMenu && <Settings />}
        </SettingsContainer>
        </>
    )
}