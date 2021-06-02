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

router.post("/api/edituser", (req, res, next) => {
const edit_user_query = `UPDATE INFORMACION_USUARIOS SET hora_inicio='${req.body.hora_inicio}', hora_final='${req.body.hora_final}', id_estado=${req.body.id_estado}  WHERE id=${req.body.id}`;

  console.log(edit_user_query);
  database.query(edit_user_query, async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify("Exitoso"));
  });
});

router.post("/api/edituseronlyhours", (req, res, next) => {

  const hora_incio_string = req.body.hora_inicio.toString();
  const hora_final_string = req.body.hora_final.toString();
  const edit_user_query = `UPDATE INFORMACION_USUARIOS SET hora_inicio='${hora_incio_string}', hora_final='${hora_final_string}'  WHERE id=${req.body.id}`;

  console.log(edit_user_query);
  database.query(edit_user_query, async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify("Exitoso"));
  });
});

router.post("/api/edituseronlyauth", (req, res, next) => {
  const edit_user_query = `UPDATE INFORMACION_USUARIOS SET id_estado=${req.body.id_estado}  WHERE id=${req.body.id}`;

  console.log(edit_user_query);
  database.query(edit_user_query, async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify("Exitoso"));
  });
});

module.exports = router;
