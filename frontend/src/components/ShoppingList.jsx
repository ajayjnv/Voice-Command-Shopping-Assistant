import React from 'react';

function ShoppingList({ items, onRemove, onUpdateQuantity }) {
    return (
        <div>
            <h3>Your Shopping List</h3>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.name} - {item.quantity} [{item.category}]
                        <button onClick={() => onRemove(item._id)}>Remove</button>
                        <button onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                        <button onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
