const routerStatement = require("express");

const router = routerStatement.Router();
const { database } = require("../config/dbConfig");

//LOGIN PART:
router.get("/api/lastuser", (req, res, next) => {
  const last_user_query = "SELECT * FROM ULTIMOS_USUARIOS";

  database.query(last_user_query, async (err, result) => {
    if (err) throw err;

    result.map((person) => {
      const query_person = `SELECT cargo, link_img FROM INFORMACION_USUARIOS WHERE nombre='${person.nombre}'`;
      database.query(query_person, async (err, result) => {
        if (err) throw err;

        const update_person_query = `UPDATE ULTIMOS_USUARIOS SET cargo='${result[0].cargo}', link_img='${result[0].link_img}' WHERE nombre='${person.nombre}' `;
        database.query(update_person_query, async (err, result) => {
          if (err) throw err;
      
          const user_modify_query = "SELECT * FROM ULTIMOS_USUARIOS"; 
          database.query(user_modify_query, async (err, result) => {
            if (err) throw err;
        
            res.end(JSON.stringify(result));
          });
        });
      });
    });
  });
});

module.exports = router;
