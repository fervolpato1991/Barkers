const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

conn.sync().then(() => {
  server.listen(process.env.PORT, () => {
    console.log('Listening at', process.env.PORT);
  });
});
