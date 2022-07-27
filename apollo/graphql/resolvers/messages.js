const Message = require('../../models/Message');

const transformMessage = m => {
  return new Message({
    ...m._doc,
    name: m.name,
    text: m.text,
    type: m.type,
    fileName: m.fileName,
    address: m.address,
    createdBy: m.createdBy,
    createdAt: m.createdAt
  });
};
module.exports = {
    Mutation: {
        async createMessage(_, {messageInput: {name, type, text, fileName, address, username} }) {
          console.log(11111)
            const newMessage = new Message({
                name: name,
                type: type,
                text: text,
                fileName: fileName,
                address: address,
                createdBy: username,
                createdAt: new Date().toISOString()
            });

            const res = await newMessage.save();
            console.log(res);
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        message: (_, {ID}) => Message.findById(ID),
        messages: async () => {
            try {
              const msg = await Message.find();
              return msg.map(m => {
                return transformMessage(m);
              });
            } catch (err) {
              throw err;
            }
          }
    }
}