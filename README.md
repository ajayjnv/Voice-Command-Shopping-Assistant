Tech Stack 
----------
Frontend: React.js, react-speech-recognition (voice capture), compromise.js (NLP), react-i18next (multilingual)

Backend: Node.js, Express.js, MongoDB with Mongoose ODM

Project Structure and Explanation :
----------------------------------
Backend :
--------
server.js: Entry point that sets up Express server, connects MongoDB, and loads routes.

models/ShoppingItem.js: MongoDB schema defining shopping list item properties.

controllers/shoppingController.js: Handles core logic—adding, removing, updating, searching items, and generating smart suggestions.

routes/shopping.js: HTTP endpoints for CRUD operations and suggestions.

.env: Environment variables storing sensitive config like MongoDB URI and server port.

Frontend :
--------
src/index.js & App.js: React app bootstrap and routing.

src/pages/HomePage.jsx: Main page managing state, voice command handling, and rendering UI components.

src/components/VoiceInput.jsx: Handles voice input for adding, removing, or updating items, including microphone UI and animations.

src/components/VoiceSearch.jsx: Separately captures voice input for searching items with filters.

src/components/ShoppingList.jsx: Displays the current shopping list with interactive options to remove or update quantities.

src/components/SuggestionList.jsx: Shows smart product suggestions.

src/services/api.js: Abstracts REST API calls to the backend.

src/utils/voiceCommandParser.js: Contains NLP parser that interprets voice transcripts into actions (add/remove/search) with details like quantities, categories, and filters.

src/components/VoiceInput.css: Styling for microphone animation and UI elements.

How to Run the Project:
---------------------
Backend :
-------
Navigate to backend folder

Install dependencies:

terminal:
npm install
Create .env file with MongoDB connection string and port:

.env :
MONGO_URI=your_mongo_uri
PORT=5000

Start the server:
npm start
Frontend
Navigate to frontend folder

Install dependencies:
npm install
Start the React app:

npm start
Open http://localhost:3000 in your browser to use the app.

