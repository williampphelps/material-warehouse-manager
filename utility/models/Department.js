import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: String,
    building: mongoose.ObjectId,
    admins: [mongoose.ObjectId],
    users: [mongoose.ObjectId],
})

module.exports = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
