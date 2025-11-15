const mongoose = require('mongoose');

const ShoppingItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, default: 1 },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('ShoppingItem', ShoppingItemSchema);
