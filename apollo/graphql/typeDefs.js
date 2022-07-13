const { gql } = require('apollo-server');

module.exports = gql`
type Message {
    id: ID
    name: String
    type: String
    text: String
    createdAt: String
    createdBy: String
}

input MessageInput {
    name: String
    type: String
    text: String
    username: String
}

type Query {
    message(id: ID!): Message
    messages: [Message!]!
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
}
`