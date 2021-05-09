const passport = require('passport');
const bcrypt = require('bcryptjs');
const passport_local = require('passport-local');
const Local_strategy = passport_local.Strategy;

//Personal Modules
const { database } = require('../config/dbConfig');

passport.use(
    'local.login',
    new Local_strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        database.query(
          'SELECT * FROM USUARIOS WHERE user = ?',
          [username],
          async (err, result) => {

            if (err) throw err;

            const user_info = await result[0];
            
            if (result[0] == null) {
              console.log('Ese usuario NO existe');
              done(null, false);
            } else {
              console.log('SI EXISTE EL USUARIO');
              const validPassword = await bcrypt.compare(
                password,
                result[0].password
              );
              if (validPassword) {
                console.log('Las contraseñas coinciden');
                const user = {
                  id: user_info.id || '',
                  user: user_info.user
                };
                done(null, user);
              } else {
                console.log('No coinciden');
                done(null, false);
              }
            }
          }
        );
      }
    )
  );
  
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
