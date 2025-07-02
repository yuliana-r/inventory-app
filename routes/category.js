const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/new', categoryController.showNewCategoryForm);
categoryRouter.post('/new', categoryController.createCategory);
categoryRouter.get('/:categoryId', categoryController.getCategoryById);
categoryRouter.get('/:categoryId/update', categoryController.showUpdateCategoryForm);
categoryRouter.post('/:categoryId/update', categoryController.updateCategory);
categoryRouter.get('/:categoryId/delete', categoryController.showDeleteCategoryForm);
categoryRouter.post('/:categoryId/delete', categoryController.deleteCategory);

module.exports = categoryRouter;
