const { Router } = require('express');
const indexRouter = Router();
const db = require('../db/queries/index_queries');

indexRouter.get('/', async (req, res) => {
  const totalCategories = await db.getTotalCategories();
  const totalItems = await db.getTotalItems();
  const totalBrands = await db.getTotalBrands();
  const totalPieces = await db.getTotalPieces();
  const totalBags = await db.getTotalBags();
  const totalKg = (await db.getTotalKg()) || 0;
  const totalGrams = (await db.getTotalGrams()) || 0;
  const totalLitres = (await db.getTotalLitres()) || 0;
  const totalMl = (await db.getTotalMl()) || 0;

  const totalWeight = parseFloat(totalKg) + parseFloat(totalGrams) / 1000;
  const totalVolume = parseFloat(totalLitres) + parseFloat(totalMl) / 1000;

  res.render('index', {
    title: 'home',
    totalCategories,
    totalItems,
    totalBrands,
    totalPieces,
    totalBags,
    totalWeight,
    totalVolume,
  });
});

module.exports = indexRouter;
