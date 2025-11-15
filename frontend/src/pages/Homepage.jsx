import React, { useState, useEffect } from 'react';
import VoiceInput from '../components/VoiceInput';
import VoiceSearch from '../components/VoiceSearch';
import ShoppingList from '../components/ShoppingList';
import SuggestionList from '../components/SuggestionList';
import { parseVoiceCommand } from '../utils/voiceCommandParser';
import { addItem, getList, deleteItem, updateItem, getSuggestions, searchItems } from '../services/api';

const USER_ID = "user123";

function HomePage() {
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isListening, setIsListening] = useState(false);  // Central listening state

    const refreshList = () => {
        getList(USER_ID).then(res => setItems(res.data));
    };

    useEffect(() => {
        refreshList();
        getSuggestions(USER_ID).then(res => setSuggestions(res.data));
    }, []);

    const handleStartListening = () => {
        setIsListening(true);
    };

    const handleStopListening = () => {
        setIsListening(false);
    };

    const handleVoiceCommand = (transcript) => {
        setIsListening(false);
        const { action, itemName, quantity, category } = parseVoiceCommand(transcript);
        if (action === 'add') {
            addItem({ name: itemName, quantity, category, userId: USER_ID }).then(refreshList);
        } else if (action === 'remove') {
            const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
            if (item) deleteItem(item._id).then(refreshList);
        } else if (action === 'update') {
            const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
            if (item) updateItem(item._id, { quantity }).then(refreshList);
        }
    };

    const handleSearchCommand = (transcript) => {
        setIsListening(false);
        const { action, itemName, brand, size, priceFilter } = parseVoiceCommand(transcript);
        if (action !== 'search') {
            alert("Please say a search command like 'Find ...' or 'Search ...'");
            return;
        }
        const params = { userId: USER_ID, itemName, brand, size };
        if (priceFilter && priceFilter.max) params.priceMax = priceFilter.max;
        searchItems(params).then(res => {
            setItems(res.data);
        });
    };

    return (
        <div className="container">
            <h2>Smart Shopping List</h2>
            <VoiceInput
                onVoiceCommand={handleVoiceCommand}
                isListening={isListening}
                onStartListening={handleStartListening}
                onStopListening={handleStopListening}
            />
            
            <SuggestionList
                suggestions={suggestions}
                onAdd={name => addItem({ name, quantity: 1, userId: USER_ID }).then(refreshList)}
            />
            <VoiceSearch
                onSearchCommand={handleSearchCommand}
                isListening={isListening}
                onStartListening={handleStartListening}
                onStopListening={handleStopListening}
            />
            <ShoppingList
                items={items}
                onRemove={id => deleteItem(id).then(refreshList)}
                onUpdateQuantity={(id, q) => updateItem(id, { quantity: q }).then(refreshList)}
            />
        </div>
    );
}

export default HomePage;
