const db = require('../db/queries/item_queries');
const unit_db = require('../db/queries/unit_queries');
const brand_db = require('../db/queries/brand_queries');
const category_db = require('../db/queries/category_queries');
const { body, validationResult } = require('express-validator');

const validateItem = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Item name must be between 1 and 20 characters.'),
];

function handleServerError(res, error, message = 'Internal Server Error') {
  console.error(message, error);
  res.status(500).send(message);
}

// GET /items
exports.getAllItems = async (req, res) => {
  const items = await db.getAllItems();
  try {
    res.render('item_list', { title: 'items', items_list: items });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /items/new
exports.showNewItemForm = async (req, res) => {
  const units = await unit_db.getAllUnits();
  const categories = await category_db.getAllCategories();
  const brands = await brand_db.getAllBrands();
  try {
    res.render('item_form', {
      title: 'new item',
      item: undefined,
      units: units || [],
      categories: categories || [],
      brands: brands || [],
      isUpdate: false,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /items/new
exports.createItem = [
  validateItem,
  async (req, res) => {
    const { name, qty, unit_id, category_id, brand_id } = req.body;
    const units = await unit_db.getAllUnits();
    const categories = await category_db.getAllCategories();
    const brands = await brand_db.getAllBrands();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('item_form', {
        title: 'new item',
        item: { name, qty, unit_id, category_id, brand_id },
        units,
        categories,
        brands,
        errors: errors.array(),
        isUpdate: false,
      });
    }

    try {
      await db.insertItem(name, qty, unit_id, category_id, brand_id);
      res.redirect('/items');
    } catch (error) {
      handleServerError(res, error);
    }
  },
];

// GET /items/:itemId
exports.getItemById = async (req, res) => {
  const { itemId } = req.params;
  const item = await db.getItemById(itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  try {
    res.render('item_detail', { title: 'item details', item });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /items/:itemId/update
exports.showUpdateItemForm = async (req, res) => {
  const { itemId } = req.params;
  const item = await db.getItemById(itemId);
  const units = await unit_db.getAllUnits();
  const categories = await category_db.getAllCategories();
  const brands = await brand_db.getAllBrands();
  try {
    res.render('item_form', {
      title: 'update item',
      item,
      units,
      categories,
      brands,
      isUpdate: true,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /items/:itemId/update
exports.updateItem = [
  validateItem,
  async (req, res) => {
    const { itemId } = req.params;
    const { name, qty, unit_id, category_id, brand_id } = req.body;
    const units = await unit_db.getAllUnits();
    const categories = await category_db.getAllCategories();
    const brands = await brand_db.getAllBrands();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('item_form', {
        title: 'update item',
        item: { item_id: itemId, name, qty, unit_id, category_id, brand_id },
        units,
        categories,
        brands,
        errors: errors.array(),
        isUpdate: true,
      });
    }
    try {
      await db.updateItem(itemId, name, qty, unit_id, category_id, brand_id);
      res.redirect(`/items/${itemId}`);
    } catch (error) {
      handleServerError(res, error);
    }
  },
];

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
