const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    likes:{
        type: Number,
        default: 0,
        required: true
    },
    dislikes:{
        type: Number,
        default: 0,
        required: true
    }, 
    tags:{
        type: Array,
        default: [],
        required: true
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;