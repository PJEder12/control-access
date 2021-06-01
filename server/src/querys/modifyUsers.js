const routerStatement = require("express");

const router = routerStatement.Router();
const { database } = require("../config/dbConfig");

//LOGIN PART:
router.get("/api/modifyusers", (req, res, next) => {
  const last_user_query =
    "SELECT * FROM INFORMACION_USUARIOS i, ESTADO_USUARIOS e WHERE i.id_estado=e.id_estado";

  database.query(last_user_query, async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify(result));
  });
});

module.exports = router;
