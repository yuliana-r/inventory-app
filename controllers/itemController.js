const db = require('../db/queries/item_queries');
const unit_db = require('../db/queries/unit_queries');
const brand_db = require('../db/queries/brand_queries');
const category_db = require('../db/queries/category_queries');

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
exports.showNewItemForm = async (req, res) => {
  try {
    const units = await unit_db.getAllUnits();
    const categories = await category_db.getAllCategories();
    const brands = await brand_db.getAllBrands();

    res.render('item_form', {
      title: 'new item',
      item: undefined,
      units: units || [],
      categories: categories || [],
      brands: brands || [],
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /items/new
exports.createItem = async (req, res) => {
  const { name, qty, unit_id, category_id, brand_id } = req.body;
  try {
    await db.insertItem(name, qty, unit_id, category_id, brand_id);
    res.redirect('/items');
  } catch (error) {
    handleServerError(res, error);
  }
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
exports.showUpdateItemForm = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await db.getItemById(itemId);
    const units = await unit_db.getAllUnits();
    const categories = await category_db.getAllCategories();
    const brands = await brand_db.getAllBrands();

    res.render('item_form', { title: 'update item', item, units, categories, brands });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /items/:itemId/update
exports.updateItem = async (req, res) => {
  const { itemId } = req.params;

  const { name, qty, unit_id, category_id, brand_id } = req.body;

  await db.updateItem(itemId, name, qty, unit_id, category_id, brand_id);
  res.redirect(`/items/${itemId}`);
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
