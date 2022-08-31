import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    password: String,
    type: String,
    department: mongoose.ObjectId
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
