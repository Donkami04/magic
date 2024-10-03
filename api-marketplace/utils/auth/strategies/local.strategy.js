const { Strategy } = require("passport-local");
const { loginUser } = require("../../../services/auth.service");

const LocalStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await loginUser(email, password);
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error, false);
    }
  }
);

module.exports =  LocalStrategy ;