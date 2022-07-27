const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    name: String,
    type: String,
    text: String,
    fileName: String,
    address: String,
    createdAt: String,
    createdBy: String
});

module.exports = model('Message', messageSchema);