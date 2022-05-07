const {ApolloServer,PubSub} = require('apollo-server-express')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const cors = require('cors');
const {createServer} = require('http')
const express = require('express')
const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

const app = express();
app.use(cors(),express.json());
const pubsub=new PubSub()

const httpServer= createServer(app);


const schema = makeExecutableSchema({typeDefs,resolvers})
const apolloServer = new ApolloServer({schema,subscriptions:'/subscribes',context:({req})=>({req,pubsub})})

apolloServer.start();
apolloServer.applyMiddleware({app, path:'/graphql'})
apolloServer.installSubscriptionHandlers(httpServer)

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db Connect');
    return httpServer.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server Running ${res.url}`);
  });



















// const {ApolloServer} = require('apollo-server');
// const mongoose = require('mongoose');
// const { MONGODB } = require('./config');
// const typeDefs = require('./graphql/typeDefs')
// const resolvers = require('./graphql/resolvers/index')


// //TODO: create apollo server method
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context:({req})=>({req})
// });

// //TODO connect database
// mongoose
//   .connect(MONGODB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Db Connect');
//     return server.listen({ port: 5000 });
//   })
//   .then(res => {
//     console.log(`Server Running ${res.url}`);
//   });
