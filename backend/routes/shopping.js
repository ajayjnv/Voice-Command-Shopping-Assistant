const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/ShoppingController.js');

router.post('/add', shoppingController.addItem);
router.get('/list', shoppingController.getList);
router.delete('/delete/:id', shoppingController.deleteItem);
router.put('/update/:id', shoppingController.updateItem);
router.get('/suggestions', shoppingController.getSuggestions);
router.get('/search', shoppingController.searchItems);


module.exports = router;
