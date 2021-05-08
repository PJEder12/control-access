const routerStatement = require('express');

const router = routerStatement.Router();
const { database } = require('../config/dbConfig');

router.get('/', (req, res) => {
    res.send('<h1>Hola</h1>');
    let sampleQuery =
    'SELECT * FROM MUESTRAS_PRODUCCION'

  let dbQuery = database.query(
    sampleQuery,
    async (err, result) => {
      if (err) throw err
      console.log(result);
    }
  );
});

module.exports = router;