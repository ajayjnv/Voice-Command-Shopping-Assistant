export function parseVoiceCommand(text) {
    const lowerText = text.toLowerCase();
    let action = null;
    if (/^(add|buy|i need|want to buy|please add)/.test(lowerText)) action = 'add';
    else if (/^(remove|delete|take off|remove from my list)/.test(lowerText)) action = 'remove';
    else if (/^(update|change|modify|set quantity of)/.test(lowerText)) action = 'update';
    else if (/^(find|search|show)/.test(lowerText)) action = 'search'; // new for search action

    // Quantity extraction (for add/update)
    const quantityMatch = lowerText.match(/(\d+)/);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

    // Price range extraction for search e.g. "under $5"
    let priceFilter = null;
    const priceMatch = lowerText.match(/under\s*\$?(\d+)/);
    if (priceMatch) priceFilter = { max: parseFloat(priceMatch[1]) };

    // Extract brand or size keywords (e.g., "organic", "small", "large")
    const brandMatch = lowerText.match(/\b(organic|fresh|premium)\b/);
    const brand = brandMatch ? brandMatch[1] : null;

    const sizeMatch = lowerText.match(/\b(small|medium|large|bottle|pack)\b/);
    const size = sizeMatch ? sizeMatch[1] : null;

    // Extract item name after removing known action words and filters
    const itemNameMatch = lowerText.match(/(?:add|buy|i need|want to buy|please add|remove|delete|take off|remove from my list|update|change|modify|set quantity of|find|search|show)?\s*(\d+)?\s*(.+)/);
    let itemNameRaw = itemNameMatch ? itemNameMatch[2].trim() : lowerText;
    // Remove brand and size words from item name if present
    if (brand) itemNameRaw = itemNameRaw.replace(brand, '').trim();
    if (size) itemNameRaw = itemNameRaw.replace(size, '').trim();

    const itemName = itemNameRaw.replace(/(from|to) my list/g, '').trim();

    // Categorize item as before
    let category = 'Other';

    return { action, itemName, quantity, category, brand, size, priceFilter };
}
