const { Router } = require('express');
const brandController = require('../controllers/brandController');
const brandsRouter = Router();

brandsRouter.get('/', brandController.getAllBrands);
brandsRouter.get('/new', brandController.showNewBrandForm);
brandsRouter.post('/new', brandController.createBrand);
brandsRouter.get('/:brandId', brandController.getBrandById);
brandsRouter.get('/:brandId/update', brandController.showUpdateBrandForm);
brandsRouter.post('/:brandId/update', brandController.updateBrand);
brandsRouter.get('/:brandId/delete', brandController.showDeleteBrandForm);
brandsRouter.post('/:brandId/delete', brandController.deleteBrand);

module.exports = brandsRouter;
