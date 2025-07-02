// GET /categories
exports.getAllCategories = async (req, res) => {
  res.send('all categories page');
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
  res.send(`displaying category with id:${categoryId}`);
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
  res.send('deleting category here');
};
