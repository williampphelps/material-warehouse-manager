import mongoose from 'mongoose';

const QuantitySchema = new mongoose.Schema({
    quantity: Number,
    unit: String,
});

const InventorySchema = new mongoose.Schema({
    product: mongoose.ObjectId,
    productUPC: String,
    bin: mongoose.ObjectId,
    quantity: [QuantitySchema],
    name: String,
    binName: String,
});
module.exports = mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
