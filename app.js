let express = require('express');
let path = require('path');
let app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// assign routers to paths
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

module.exports = app;
