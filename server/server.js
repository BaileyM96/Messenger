console.log('Server starting... hi!')
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleWare } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001
const app = express();
// const server = new ApolloServer({
//     resolvers,
//     typeDefs,
//     introspection: process.env.NODE_ENV !== 'production',
//     playground: process.env.NODE_ENV !== 'production',
//     context: authMiddleWare,
// });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// });

//Create a new instance of GraphQL server.

const startApolloServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        introspection: process.env.NODE_ENV !== 'production',
        playground: process.env.NODE_ENV !== 'production',
        context: authMiddleWare,

    });

    console.log('Server created')

    await server.start();
    console.log('server started')
        server.applyMiddleware({ app });

        db.once('open', () => {
            console.log('Opened');
            app.listen(PORT, () => {
                console.log(`API server is running on port! ${PORT}!`);
                console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
            })
        })
}

startApolloServer(typeDefs, resolvers);

