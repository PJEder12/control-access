const routerStatement = require("express");

const router = routerStatement.Router();
const { database } = require("../config/dbConfig");

//LOGIN PART:
router.get("/api/lastuser", (req, res, next) => {
  const last_user_query = "SELECT * FROM ULTIMOS_USUARIOS";

  database.query(last_user_query, async (err, result) => {
    if (err) throw err;

    res.end(JSON.stringify(result));
  });
});

module.exports = router;