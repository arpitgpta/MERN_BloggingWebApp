const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: {
        type: Array,
        default: [],
        required: false
    },
    intrestedTags: {
        type: Array,
        default: [],
        required: false
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;