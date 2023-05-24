//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Se importa app.js que contiene la configuración del servidor:
const server = require('./src/app.js');
// Se importa el objeto conn desde db.js, que representa la conexión a la base de datos:
const { conn } = require('./src/db.js');

// Syncing all the models at once.
// Se utiliza el método sync del objeto conn para sincronizar todos los modelos de la base de datos.
conn.sync({ force: true }).then(() => {
  // El parámetro { force: true } indica que se eliminarán
  // y recrearán las tablas en la base de datos cada vez que se sincronicen los modelos
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
