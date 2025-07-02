const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.send('welcome to dashboard - this will display the total number of categories, items, brands');
});

module.exports = indexRouter;
