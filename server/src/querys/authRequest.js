const routerStatement = require('express');

const router = routerStatement.Router();
// const { database } = require('../config/dbConfig');

//LOGIN PART:
router.post('/api/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local.login', (err, user, info) => {
    if (err) throw err;
    if (user) {
      req.login(user, (err) => {
        if (err) throw err;
        res.end(JSON.stringify('EXITO: EL USUARIO ESTÁ AUTENTICADO'));
      });
    } else {
      res.end(JSON.stringify('ERROR'));
    }
  })(req, res, next);
});

//ROUTE TO KNOW IF THE USER IS AUTH OR NOT:
router.get('/api/isAuth', (req, res) => {
  res.end(JSON.stringify(req.user));
  // res.end(JSON.stringify(req.isAuthenticated()));
});

//LOG OUT
router.post('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    // Don't redirect, just print text
    res.send('Logged out');
  });
});

module.exports = router;