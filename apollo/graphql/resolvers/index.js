const messagesResolvers = require('./messages');
const fileResolvers = require('./file');

module.exports = {
    Query: {
        ...messagesResolvers.Query
       // ...fileResolvers.Query
        
    },
    Mutation: {
        ...messagesResolvers.Mutation
        //...fileResolvers.Mutation
    },
};