const db = require('../db/queries/category_queries');

function handleServerError(res, error, message = 'Internal Server Error') {
  console.error(message, error);
  res.status(500).send(message);
}

// GET /categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.send(categories);
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /categories/new
exports.showNewCategoryForm = (req, res) => {
  res.send('render New Category form here');
};

// POST /categories/new
exports.createCategory = (req, res) => {
  res.send('posting new category to the database here');
};

// GET /categories/:categoryId
exports.getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await db.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.send(category);
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /categories/:categoryId/update
exports.showUpdateCategoryForm = (req, res) => {
  res.send('render Update category form here');
};

// POST /categories/:categoryId/update
exports.updateCategory = async (req, res) => {
  res.send('updating category here');
};

// GET /categories/:categoryId/delete
exports.showDeleteCategoryForm = (req, res) => {
  res.send('render Delete category form here');
};

// POST /categories/:categoryId/delete
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    await db.deleteCategory(categoryId);
    res.redirect('/categories');
  } catch (error) {
    handleServerError(res, error);
  }
};
