import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    status: String,
    manufacturer: String,
    model: String,
    type: String,
    minStock: Number,
    upc: String,
    reorder: Boolean,
    on_order: Number,
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
