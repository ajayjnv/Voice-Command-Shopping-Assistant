const ShoppingItem = require('../models/ShoppingItem');

// Helper: Categorize item based on name (simple example)
function categorizeItem(name) {
    const dairy = ['milk', 'cheese', 'yogurt', 'butter'];
    const produce = ['apple', 'banana', 'orange', 'carrot'];
    const snacks = ['chips', 'cookies', 'crackers'];

    if (dairy.includes(name.toLowerCase())) return 'Dairy';
    if (produce.includes(name.toLowerCase())) return 'Produce';
    if (snacks.includes(name.toLowerCase())) return 'Snacks';
    return 'Other';
}

exports.addItem = async (req, res) => {
    const { name, quantity, userId } = req.body;
    try {
        const category = categorizeItem(name);
        const item = new ShoppingItem({ name, category, quantity, userId });
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getList = async (req, res) => {
    const { userId } = req.query;
    try {
        const items = await ShoppingItem.find({ userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await ShoppingItem.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const item = await ShoppingItem.findByIdAndUpdate(id, { quantity }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Smart suggestions endpoint
exports.getSuggestions = async (req, res) => {
    // Pseudo-code: implement seasonal, history-based, substitute suggestions
    // For demo: return mock suggestions
    res.json([
        { name: "bread", reason: "Low stock" },
        { name: "pumpkin", reason: "Seasonal" }
    ]);
};

exports.searchItems = async (req, res) => {
    const { itemName, brand, size, priceMax, userId } = req.query;

    let query = { userId };

    if (itemName) {
        query.name = { $regex: new RegExp(itemName, 'i') }; // case-insensitive partial match
    }

    if (brand) {
        query.name = { ...query.name, $regex: new RegExp(brand, 'i') };
    }

    if (size) {
        query.name = { ...query.name, $regex: new RegExp(size, 'i') };
    }

    // Assuming you have price field in schema (add if missing)
    if (priceMax) {
        query.price = { $lte: parseFloat(priceMax) };
    }

    try {
        const items = await ShoppingItem.find(query);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

