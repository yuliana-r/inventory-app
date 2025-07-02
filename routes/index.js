const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'shelf-aware' });
});

module.exports = indexRouter;
