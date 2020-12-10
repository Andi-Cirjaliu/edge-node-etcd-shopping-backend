const db = require('./db');

const getShopppingList = async (req, res, next) => {
    console.log('Get shopping list...');
    const result = await db.getAllValues();
    return res.json(result);
}

const deleteShopppingItem = async (req, res, next) => {
    const item = req.params.item;
    console.log('Delete item ', item);
    await db.deleteKey(item);
    return res.json({message:'The item was deleted'});
}

module.exports = {
    getShopppingList,
    deleteShopppingItem
}