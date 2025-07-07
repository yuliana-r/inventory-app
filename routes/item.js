const { Router } = require('express');
const itemController = require('../controllers/itemController');
const itemsRouter = Router();

itemsRouter.get('/', itemController.getAllItems);
itemsRouter.get('/new', itemController.showNewItemForm);
itemsRouter.post('/new', itemController.createItem);
itemsRouter.get('/:itemId', itemController.getItemById);
itemsRouter.get('/:itemId/update', itemController.showUpdateItemForm);
itemsRouter.post('/:itemId/update', itemController.updateItem);
itemsRouter.post('/:itemId/delete', itemController.deleteItem);

module.exports = itemsRouter;
