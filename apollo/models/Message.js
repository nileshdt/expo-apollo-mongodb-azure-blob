const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    _id: String,
    text: String,
    createdAt: String,
    createdBy: String
});

module.exports = model('Message', messageSchema);