const routerStatement = require("express");

const router = routerStatement.Router();
const { database } = require("../config/dbConfig");

//LOGIN PART:
router.post("/api/takephoto", (req, res, next) => {
  information_user = req.body;

  const take_photo_query = "INSERT INTO INFORMACION_USUARIOS SET ?";

  database.query(take_photo_query, [information_user], async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify("EXITO"));
  });
});

module.exports = router;
