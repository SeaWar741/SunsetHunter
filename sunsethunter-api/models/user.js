const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: { 
        type: String, 
        required: false 
    },
    email: { 
        type: String, 
        required: false 
    },
    sites: { 
        type: Array, 
        required: false 
    }
});

module.exports = new mongoose.model('users', UserSchema);