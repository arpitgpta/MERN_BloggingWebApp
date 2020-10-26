const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id :{
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
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