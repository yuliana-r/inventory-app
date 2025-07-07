const db = require('../db/queries/category_queries');

function handleServerError(res, error, message = 'Internal Server Error') {
  console.error(message, error);
  res.status(500).send(message);
}

// GET /categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render('category_list', { title: 'categories', categories_list: categories });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /categories/new
exports.showNewCategoryForm = (req, res) => {
  res.render('category_form', { title: 'new category', category: undefined });
};

// POST /categories/new
exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    await db.insertCategory(categoryName);
    res.redirect('/categories');
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /categories/:categoryId
exports.getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await db.getCategoryById(categoryId);
    const itemsInCategory = await db.getItemByCategory(categoryId);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.render('category_detail', { title: 'category detail', category, itemsInCategory });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /categories/:categoryId/update
exports.showUpdateCategoryForm = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await db.getCategoryById(categoryId);
    res.render('category_form', { title: 'update category', category });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /categories/:categoryId/update
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    await db.updateCategory(categoryId, categoryName);
    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /categories/:categoryId/delete
exports.showDeleteCategoryConfirm = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await db.getCategoryById(categoryId);
    if (!category) return res.status(404).send('Categort not found');
    res.render('category_confirm_delete', { title: 'delete category?', category });
  } catch (error) {
    handleServerError(res, error);
  }
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
