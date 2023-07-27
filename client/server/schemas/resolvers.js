const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User } = require('../models');
const bcrypt = require('bcrypt')

const { signToken } = require('../utils/auth');

const resolvers = {
    //Load users if current user searches for someone
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, {email}) => {
            return User.findOne({ email });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw new AuthenticationError('Please Login!')
        }
    },

    
    Mutation: {
        createUser: async(parent, { email, password, userName }) => {
            const user = await User.create({ email, password, userName });
            console.log(user);
            const token = signToken(user);
            return { token, user };
        },
        login: async(parent, { email, password }) => {
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
            const token = signToken(user);
            return { token, user };
        }

    
    }
};

module.exports = resolvers;