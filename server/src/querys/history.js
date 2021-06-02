const routerStatement = require("express");

const router = routerStatement.Router();
const { database } = require("../config/dbConfig");

//LOGIN PART:
router.get("/api/history", (req, res, next) => {
  const history_query = "SELECT * FROM HISTORICOS_USUARIOS";

  database.query(history_query, async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify(result));
  });
});

router.post("/api/filterhistory", (req, res, next) => {
  const fecha_inicio = req.body.fecha_inicio + " 00:00";
  const fecha_final = req.body.fecha_final + " 11:59";

  const history_query = `SELECT * FROM HISTORICOS_USUARIOS WHERE hora_inicio BETWEEN '${fecha_inicio}' AND '${fecha_final}' ORDER BY hora_inicio DESC`;
    database.query(history_query, async (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
});

module.exports = router;
