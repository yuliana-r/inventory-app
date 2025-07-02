let express = require('express');
let app = express();
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const itemsRouter = require('./routes/item');
const brandsRouter = require('./routes/brand');
const categoriesRouter = require('./routes/category');

app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/brands', brandsRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
