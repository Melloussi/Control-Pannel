const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./database-connection')

//, getUserByEmail, getUserById
function initialize(passport) {

  //Athunticate User & Password
  passport.use(new LocalStrategy({ usernameField: 'username' }, (_username, password, done) => {
    //
    db.getUsers(_username)

      .then((user) => {

        user = user[0]

        if (user == null) {
          return done(null, false, { message: 'No user with that email' })
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {

          if (err) throw err

          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }

        })


      })
      .catch((err) => {
        console.log(err)
      })

  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async function(id, done) {

    db.getUserById(id)
    .then((user) => {
      console.log("Shity User :(|  "+user)
      user = user[0]
      done(null, user);
    })
    .catch((err) => {
      console.log(err)
    })

  });


}

module.exports = initialize