const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User } = require('../models');

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
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email!');
            }

            const correctPW = await user.password;

            if (!correctPW) {
                throw new AuthenticationError('Incorrect Password!');
            }

            const token = signToken(user);
            return { token, user };
        }

    
    }
};

module.exports = resolvers;