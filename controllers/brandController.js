// GET /brands
exports.getAllBrands = async (req, res) => {
  res.send('all brands page');
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
  res.send(`displaying brand with id:${brandId}`);
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
  res.send('deleting brand here');
};
