const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    name: String,
    type: String,
    text: String,
    createdAt: String,
    createdBy: String
});

module.exports = model('Message', messageSchema);