const express = require('express');
const controller = require('./shoppingController');

const router = express.Router();

router.get('/shopping', controller.getShopppingList);

router.post('/shopping', controller.addShopppingItem);

router.put('/shopping/:item/dec', controller.decQtyShopppingItem);
router.put('/shopping/:item/inc', controller.incQtyShopppingItem);

router.delete('/shopping/:item', controller.deleteShopppingItem);

module.exports = router;