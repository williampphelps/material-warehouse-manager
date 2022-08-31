import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
    name: String,
    admins: [mongoose.ObjectId],
    users: [mongoose.ObjectId],
})

module.exports = mongoose.models.Building || mongoose.model('Building', BuildingSchema);
