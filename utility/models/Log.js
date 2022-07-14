import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    category: String,
    content: String,
    type: String,
    object: mongoose.ObjectId,
    date: Date,
});

module.exports = mongoose.models.Log || mongoose.model('Log', LogSchema);
