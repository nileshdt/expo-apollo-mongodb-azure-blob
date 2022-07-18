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
type File {
    filename: String!
    mimetype: String!
    encoding: String!

}

input MessageInput {
    name: String
    type: String
    text: String
    username: String
}
scalar Upload
type Query {
    message(id: ID!): Message
    messages: [Message!]!
    uploads: [File]
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
    singleUpload(file: Upload!): File!
}
`