// GET /items
exports.getAllItems = async (req, res) => {
  res.send('all items page');
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
  res.send(`displaying item with id:${itemId}`);
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
  res.send('deleting item here');
};
