let express = require('express');
let app = express();
const port = process.env.PORT || 3000;

const itemsRouter = require('./routes/items');

app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('hi!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
