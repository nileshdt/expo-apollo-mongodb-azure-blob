const { ApolloServer}  = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const MONGODB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rmar3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });