import { H2 } from "./styled/Headers.styled";
import { FriendTitle, FriendsHeader, FriendsList, PendingRequests, PendingRequestsList } from "./styled/Containers.styled";
import { AdduserIcon } from "./styled/Icons.styled";
import { Link } from "react-router-dom";
import { Avatar } from "./styled/Images.styled";
import myImage from '../images/avatar-ga53cc9638_1280.png';
import { Name } from "./styled/Text.styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Message } from "semantic-ui-react";

//Query the data from the database
import { useQuery } from "@apollo/client";
import { QUERY_USER, GET_PENDING_FRIEND_REQUESTS } from "../utils/queries";
import { ACCEPT_FRIEND_REQUEST, DECLINE_FRIEND_REQUEST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";



export default function Friends({userName}) {
   const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userName },
   });
   const { data: dataRequests } = useQuery(GET_PENDING_FRIEND_REQUESTS, {
    variables: { userName },
   });

   const [addedFriendMessage, setAddedFriendMessage] = useState('');
   const [declineFriendMessage, setDeclineFriendMessage] = useState('');

   //Accept or Decline friend request
    const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST)
    const [declineFriendRequest] = useMutation(DECLINE_FRIEND_REQUEST); 
    const handleDecline = async (requesterId) => {
        try {
            await declineFriendRequest({ variables: { requesterId } });
            setDeclineFriendMessage('Request Declined!');
            setTimeout(() => {
                setDeclineFriendMessage('');
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.error('Cannot decline the friend request', error);
        }
    }

    const handleAccept = async (requesterId) => {
        try {
            await acceptFriendRequest({ variables: { requesterId } });
            setAddedFriendMessage('Friend succesfully added!')
            setTimeout(() => {
                setAddedFriendMessage('');
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.error('Cannot accept friend request', error);
        }
    }

   if (loading) return null;
   if (error) return `Error ${error}`;

   const friends = data?.user?.friends || [];
   const pendingRequests = dataRequests?.pendingFriendRequests || [];
   console.log('friends:', friends);
   console.log('Pending Requests:', pendingRequests);

    
    return (
        <>
        <FriendsHeader>
            <H2>Friends</H2>
            <Link to='/Addfriends'>
                <AdduserIcon name='add user' size='large'></AdduserIcon>
            </Link>
        </FriendsHeader>
        
        {dataRequests?.pendingFriendRequests && dataRequests.pendingFriendRequests.length > 0 && 
        dataRequests.pendingFriendRequests.map(request => (
            <>
                <PendingRequests key={request._id}>
                    <h4>Pending Requests</h4>
                </PendingRequests>
                <PendingRequestsList key={request._id}>
                    <Avatar src={myImage} size="mini" avatar/>
                   <Name>{request.from.userName}</Name>
                   <FontAwesomeIcon 
                   onClick={() => handleAccept(request.from._id)} 
                   style={{background: 'transparent'}} 
                   icon={faCheck} size="2x" 
                   />

                   <FontAwesomeIcon
                   onClick={() => handleDecline(request.from._id)} 
                   style={{background: 'transparent'}}  
                   icon={faXmark} 
                   size="2x"  
                   />
                </PendingRequestsList>

                {declineFriendMessage && (
                    <Message positive>
                        <Message.Header>{declineFriendMessage}</Message.Header>
                    </Message>
                )};

                {addedFriendMessage && (
                    <Message positive>
                        <Message.Header>{addedFriendMessage}</Message.Header>
                    </Message>
                   )};
            </>
        ))
        }
        <FriendTitle>
            <h4>Friends</h4>
        </FriendTitle>

        {friends.map((friend, index) => (
        <>
        {/* <FriendTitle>
            <h4>Friends</h4>
        </FriendTitle> */}
        <FriendsList key={friend._id}>
            <Avatar src={myImage} size="mini" avatar/>
            <Name style={{color: 'white'}}>{friend.userName}</Name>
        </FriendsList>
        </>
        ))}
        </>
    )
}