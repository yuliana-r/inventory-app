const db = require('../db/queries/category_queries');
const { body, validationResult } = require('express-validator');

const validateCategory = [
  body('categoryName')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Category name must be between 1 and 20 characters.'),
];

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
  res.render('category_form', {
    title: 'new category',
    category: { name: '' },
    isUpdate: false,
    errorMessage: null,
  });
};

// POST /categories/new
exports.createCategory = [
  validateCategory,
  async (req, res) => {
    const { categoryName } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('category_form', {
        title: 'new category',
        category: { name: '' },
        errors: errors.array(),
        data: req.body,
        isUpdate: false,
      });
    }

    try {
      await db.insertCategory(categoryName);
      res.redirect('/categories');
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).render('category_form', {
          title: 'new category',
          category: { name: categoryName },
          errorMessage: 'The category already exists',
          isUpdate: false,
        });
      }
      handleServerError(res, error);
    }
  },
];

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
    res.render('category_form', { title: 'update category', category, isUpdate: true });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /categories/:categoryId/update
exports.updateCategory = [
  validateCategory,
  async (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('category_form', {
        title: 'update category',
        category: { category_id: categoryId, name: categoryName },
        errors: errors.array(),
        data: req.body,
        isUpdate: true,
      });
    }
    try {
      await db.updateCategory(categoryId, categoryName);
      res.redirect(`/categories/${categoryId}`);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).render('category_form', {
          title: 'update category',
          category: { category_id: categoryId, name: categoryName },
          errorMessage: 'The category already exists',
          isUpdate: true,
        });
      }
      handleServerError(res, error);
    }
  },
];

// GET /categories/:categoryId/delete
exports.showDeleteCategoryConfirm = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await db.getCategoryById(categoryId);
    if (!category) return res.status(404).send('Category not found');
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
