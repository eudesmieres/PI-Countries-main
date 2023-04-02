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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require('./src/db.js');
const axios = require('axios');



// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    /*.findAll(); ejecuta una consulta SQL SELECT en la tabla y recupera todos los registros*/
    const allCountriesFromDB = await Country.findAll();
    if (!allCountriesFromDB.length) {
      const { data } = await axios.get("https://restcountries.com/v3/all");
      const countriesData = data

      var countriesMap = countriesData.map((elem) => {
        return {
          id: elem.cca3,
          name: elem.name.common,
          imgflag: elem.flags[0],
          continent: elem.continents[0],
          capital: elem.capital ? elem.capital[0] : "No se encontro capital",
          subregion: elem.subregion ? elem.subregion : "No se encontro subregion",
          area: elem.area ? elem.area : "No se encontro area",
          population: elem.population
        }
      })
      // console.log("////////////////////MAPEO/////////////////////////", countriesMap[0]);
      /*.bulkCreate recibe un array de paises para crearlos en la DB,
      await espera a completar el registro*/
      await Country.bulkCreate(countriesMap);
    }
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
