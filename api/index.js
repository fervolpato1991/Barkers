const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

conn.sync().then(() => {
  server.listen('3001', () => {
    console.log('Listening at 3001');
  });
});
