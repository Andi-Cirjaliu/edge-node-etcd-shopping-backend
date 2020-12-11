const db = require('./db');

const getShopppingList = async (req, res, next) => {
    console.log('Get shopping list...');
    const result = await db.getAllValues();
    // return res.json(result);
    return res.render('shopping/shoppingList', {
        items: result,
        pageTitle: 'Shopping list' 
      });
}

const addShopppingItem = async (req, res, next) => {
    const item = req.body.item;
    const qty = req.body.qty;
    console.log('Add item ', item, ' quantity ', qty);

    await db.setKey(item, qty);
    
    await getShopppingList(req, res, next);
}

const decQtyShopppingItem = async (req, res, next) => {
    const item = req.params.item;
    console.log('Decrement quantity item ', item);

    const val = await db.getKey(item);
    const qty = Number.parseInt(val);

    if ( qty >= 2 ) {
        await db.setKey(item, qty-1);
    } else {
        //Qty is 1 so the item can be removed
        await db.deleteKey(item);
    }
    
    await getShopppingList(req, res, next);
}

const incQtyShopppingItem = async (req, res, next) => {
    const item = req.params.item;
    console.log('Increment quantity item ', item);

    const val = await db.getKey(item);
    const qty = Number.parseInt(val);

    if ( qty < 100 ) {
        await db.setKey(item, qty+1);
    } else {
        //Qty is 100. throw an error
        throw new Error('Quantity cannot be bigger than 100');
    }
    
    await getShopppingList(req, res, next);
}

const deleteShopppingItem = async (req, res, next) => {
    const item = req.params.item;
    console.log('Delete item ', item);
    await db.deleteKey(item);
    return res.json({message:'The item was deleted'});
}

module.exports = {
    getShopppingList,
    addShopppingItem,
    decQtyShopppingItem,
    incQtyShopppingItem,
    deleteShopppingItem
}