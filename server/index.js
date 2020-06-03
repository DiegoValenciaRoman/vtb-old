const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
// REQUIRE
require('./config/config')
const mongoose = require('mongoose');
const app = require('./app');

// PORT
const port = process.env.PORT || 3000; 

mongoose.connect('mongodb://localhost:27017/vtb', options, (err, res) => {

  if (err) {
    throw err;
  }else {
    console.log('Base de datos online!! ');
  }

});

app.listen(port, () => {
  console.log(`Servidor del API-Rest (Vtb) escuchando en http://localhost:${port}`);
})
