const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Post', postSchema);