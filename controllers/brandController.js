const db = require('../db/queries/brand_queries');

function handleServerError(res, error, message = 'Internal Server Error') {
  console.error(message, error);
  res.status(500).send(message);
}

// GET /brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await db.getAllBrands();
    res.render('brand_list', { title: 'brands', brands_list: brands });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /brands/new
exports.showNewBrandForm = (req, res) => {
  res.render('brand_form', {
    title: 'new brand',
    brand: { name: '' },
    isUpdate: false,
    errorMessage: null,
  });
};

// POST /brands/new
exports.createBrand = async (req, res) => {
  const { brandName } = req.body;
  try {
    await db.insertBrand(brandName);
    res.redirect('/brands');
  } catch (error) {
    if (error.code === '23505') {
      // unique constraint violation
      return res.status(400).render('brand_form', {
        title: 'new brand',
        brand: { name: brandName },
        errorMessage: 'The brand already exists',
        isUpdate: false,
      });
    }
    handleServerError(res, error);
  }
};

// GET /brands/:brandId
exports.getBrandById = async (req, res) => {
  const { brandId } = req.params;
  try {
    const brand = await db.getBrandById(brandId);
    const itemsOfBrand = await db.getItemByBrand(brandId);
    if (!brand) {
      return res.status(404).send('Brand not found');
    }
    res.render('brand_detail', { title: 'brand detail', brand, itemsOfBrand });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /brands/:brandId/update
exports.showUpdateBrandForm = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await db.getBrandById(brandId);
    res.render('brand_form', { title: 'update brand', brand, isUpdate: true });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST /brands/:brandId/update
exports.updateBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { brandName } = req.body;
    await db.updateBrand(brandId, brandName);
    res.redirect(`/brands/${brandId}`);
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /brands/:brandId/delete
exports.showDeleteBrandConfirm = async (req, res) => {
  const { brandId } = req.params;
  const brand = await db.getBrandById(brandId);
  if (!brand) return res.status(404).send('Brand not found');

  res.render('brand_confirm_delete', { title: 'delete brand?', brand });
};

// POST /brands/:brandId/delete
exports.deleteBrand = async (req, res) => {
  const { brandId } = req.params;
  try {
    await db.deleteBrand(brandId);
    res.redirect('/brands');
  } catch (error) {
    handleServerError(res, error);
  }
};
