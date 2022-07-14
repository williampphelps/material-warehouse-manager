import mongoose from 'mongoose';

const BinSchema = new mongoose.Schema({
    name: String,
    active: Boolean
});
module.exports = mongoose.models.Bin || mongoose.model('Bin', BinSchema);
