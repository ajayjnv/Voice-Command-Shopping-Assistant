import React from 'react';

function SuggestionList({ suggestions, onAdd }) {
    return (
        <div>
            <h3>Smart Suggestions</h3>
            <ul>
                {suggestions.map(s => (
                    <li key={s.name}>
                        {s.name} ({s.reason})
                        <button onClick={() => onAdd(s.name)}>Add</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SuggestionList;

