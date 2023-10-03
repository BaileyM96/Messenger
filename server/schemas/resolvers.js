const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const bcrypt = require('bcrypt')

const { signToken } = require('../utils/auth');

const resolvers = {
    //Load users if current user searches for someone
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('friends');
            }
            throw new AuthenticationError('Please Login!');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw new AuthenticationError('Please Login!')
        },
        pendingFriendRequests: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('User is not authenticated');
            }

            const user = await User.findById(context.user._id).populate({
                path: 'friendRequests.from',
                model: 'User',
            });
            console.log(user.friendRequests);

            console.log('Filtered Requests:',  user.friendRequests.filter(requests => requests.status === 'PENDING'))
            return user.friendRequests.filter(requests => requests.status === 'PENDING')
        }
    },

    
    Mutation: {
        createUser: async(parent, { email, password, userName }) => {
            const user = await User.create({ email, password, userName, friends: [], });
            console.log(user);
            const token = signToken({ email: user.email, _id: user._id, userName: user.userName });
            return { token, user };
        },
        login: async(parent, { email, password}) => {
            // console.log(`Attempting to login with email ${email} and password ${password}.`);
            const user = await User.findOne({ email });
            if (!user) {
                // console.log(`No user found with this email`)
                throw new AuthenticationError('No user found with this email!');
            }

            //add bcrypt compare here like how we defined it in the user model
            const correctPW = await bcrypt.compare(password, user.password);

            if (!correctPW) {
                // console.log(`Incorrect password`);
                throw new AuthenticationError('Incorrect Password!');
            }
            // console.log(`password is correct signing token`);
            const token = signToken({ email: user.email, _id: user._id, userName: user.userName });
            return { token, user };
        },
        sendFriendRequest: async(parent, { friendUserName}, context) => {
            if (!context.user) {
                throw new AuthenticationError('User is not authenticated!');
            }

            const recipient = await User.findOne({ userName: friendUserName });
            if (!recipient) {
                throw new AuthenticationError('Can not find recipient')
            }

            //Need to prevent the user from sending 
            if (recipient._id.equals(context.user._id)) {
                throw new AuthenticationError('Cannot send yourself a friend request');
            }

            //Add the friend request to the recipients friend request array
            recipient.friendRequests.push({ from: context.user._id, status: 'PENDING'})
            await recipient.save();
            return recipient;
        },
        acceptFriendRequest: async(parent, { requesterId }, context) => {
            console.log("requestId:", requesterId);
            if (!context.user) {
                throw new AuthenticationError('User is not authenticated!');
            }

            const recipient = await User.findById(context.user._id);
            console.log('Recipient:', recipient)
            const friendRequest = recipient.friendRequests.find(
                (request) => request.from.toString() === requesterId 
            );
            console.log('Friend Request:', friendRequest);

            if (!friendRequest) {
                throw new AuthenticationError('The friend request can not be found');
            }

            const requester = await User.findById(friendRequest.from)
            console.log('Requester:', requester);

            if (!requester || !recipient) {
                throw new AuthenticationError('User not found!');
            }

            friendRequest.status = 'ACCEPTED';

            //Add each other to their friends list
            recipient.friends.push(requester._id);
            requester.friends.push(recipient._id);

            await recipient.save();
            await requester.save();

            return recipient;
        },
        declineFriendRequest: async(parent, { requesterId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('User is not authenticated!');
            }

            const recipient = await User.findById(context.user._id);

            if (!recipient) {
                throw new AuthenticationError('User not found!')
            }

            const friendRequest = recipient.friendRequests.find(
                (request) => request.from.toString() === requesterId
            );

            if (!friendRequest) {
                throw new AuthenticationError('Friend Request can not be found')
            }

            friendRequest.status = 'DECLINED'

            //remove the friend request from the array
            recipient.friendRequests.splice(friendRequest, 1);
            
            await recipient.save();
            return recipient
        },
        addFriend: async(parent, { friendUserName }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('User is not Authenticated');
                }

                const userName = context.user.userName;
                console.log("current user username:", userName, "friendUsername:", friendUserName);


            const user = await User.findOne({ userName });
            console.log("user error", user);
           
            const friend = await User.findOne({userName: friendUserName });
            console.log("found friend");
            console.log("friend error:", friend)

            if (!friend) {
                throw new AuthenticationError('Friend not found')
            }

            
            if (!user) {
                throw new AuthenticationError('User not found');
            }


            if (!user.friends.map(friendId => friendId.toString()).includes(friend._id.toString())) {
                user.friends.push(friend._id);
                await user.save();
            }
            
            if (!friend.friends.map(friendId => friendId.toString()).includes(user._id.toString())) {
                friend.friends.push(user._id);
                await friend.save();
            }
            console.log("Username:", userName)
            console.log("friendUsername:", friendUserName)

            const populatedUser = await User.findOne({ userName }).populate('friends');

            return populatedUser
            
        }catch (error) {
            console.error('original error:', error);
            console.error('stacktrace:', error.stack);
            throw new Error('An error occured when adding a friend')
        }
        }

    
    }
};

module.exports = resolvers;