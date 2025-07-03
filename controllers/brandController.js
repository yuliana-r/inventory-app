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
  res.send('render New Brand form here');
};

// POST /brands/new
exports.createBrand = (req, res) => {
  res.send('posting new brand to the database here');
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
exports.showUpdateBrandForm = (req, res) => {
  res.send('render Update Brand form here');
};

// POST /brands/:brandId/update
exports.updateBrand = async (req, res) => {
  res.send('updating brand here');
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
