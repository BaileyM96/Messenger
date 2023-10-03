import { Menu, Modal, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AuthService from '../../utils/auth'



export default function Settings() {

const [openLogoutMessage, setOpenLogoutMessage] = useState(false);

function handleLogoutModal() {
    setOpenLogoutMessage(prevState => !prevState);
};

//Handle actual user logout
function handleLogout() {
    AuthService.logout();
    window.location.href = '/';
};

    return (
        <>
        <Menu vertical>
            <Menu.Item onClick={handleLogoutModal}>
                <Menu.Header>
                   <FontAwesomeIcon style={{marginRight: '5px'}} icon={faRightFromBracket} rotation={180} />
                   Logout
                </Menu.Header>
            </Menu.Item>
        </Menu>
        
        <Modal open={openLogoutMessage}>
            <Modal.Header>Log out</Modal.Header>
            <Modal.Content>
                <p>
                    Are you sure you want to log out?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpenLogoutMessage(false)}>Cancel</Button>
                <Button color="red" onClick={handleLogout}>Log out</Button>
            </Modal.Actions>
        </Modal>
        </>
    )
}