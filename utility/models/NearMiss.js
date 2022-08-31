import mongoose from 'mongoose';

const NearMissSchema = new mongoose.Schema({
    department: mongoose.objectId,
    building: mongoose.objectId,
    date: Date,
    conditions: [String],
    type: [String],
    description: String,
    suggestions: String,
    reportingSignature: Boolean,
    reported: mongoose.objectId,
    reportedSignature: Boolean,
    supervisor: mongoose.objectId,
    supervisorSignature: Boolean,
    time: Number,
})

module.exports = mongoose.models.NearMiss || mongoose.mode('NearMiss', NearMissSchema);
