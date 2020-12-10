const express = require('express');
const controller = require('./shoppingController');

const router = express.Router();

router.get('/shopping', controller.getShopppingList);

router.delete('/shopping/:item', controller.deleteShopppingItem);

module.exports = router;