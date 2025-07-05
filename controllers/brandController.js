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
  res.render('brand_form', { title: 'new brand' });
};

// POST /brands/new
exports.createBrand = async (req, res) => {
  const { brandName } = req.body;
  try {
    await db.insertBrand(brandName);
    res.redirect('/brands');
  } catch (error) {
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
  const { brandId } = req.params;

  const brand = await db.getBrandById(brandId);

  res.render('brand_form', { title: 'update brand', brand });
};

// POST /brands/:brandId/update
exports.updateBrand = async (req, res) => {
  const { brandId } = req.params;

  const { brandName } = req.body;
  await db.updateBrand(brandId, brandName);
  res.redirect(`/brands/${brandId}`);
};

// GET /brands/:brandId/delete
exports.showDeleteBrandForm = (req, res) => {
  res.send('render Delete Brand form here');
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
