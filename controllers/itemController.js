const db = require('../db/queries/item_queries');

function handleServerError(res, error, message = 'Internal Server Error') {
  console.error(message, error);
  res.status(500).send(message);
}

// GET /items
exports.getAllItems = async (req, res) => {
  try {
    const items = await db.getAllItems();
    res.render('item_list', { title: 'items', items_list: items });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /items/new
exports.showNewItemForm = (req, res) => {
  res.send('render New Item form here');
};

// POST /items/new
exports.createItem = (req, res) => {
  res.send('posting new item to the database here');
};

// GET /items/:itemId
exports.getItemById = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await db.getItemById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.render('item_detail', { title: 'item details', item });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /items/:itemId/update
exports.showUpdateItemForm = (req, res) => {
  res.send('render Update Item form here');
};

// POST /items/:itemId/update
exports.updateItem = async (req, res) => {
  res.send('updating item here');
};

// GET /items/:itemId/delete
exports.showDeleteItemForm = (req, res) => {
  res.send('render Delete Item form here');
};

// POST /items/:itemId/delete
exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    await db.deleteItem(itemId);
    res.redirect('/items');
  } catch (error) {
    handleServerError(res, error);
  }
};
