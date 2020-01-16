const passport = require("passport");
const User = require("../schemas/User");

//POST new user route (optional, everyone has access)
function register(req, res, next) {
  const { username, password, name, surname } = req.body;

  try {
    const finalUser = new User({ username, password, name, surname });
    finalUser.setPassword(password);

    return finalUser
      .save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }))
      .catch(err => {
        if (err) {
          return res.status(422).json({
            errors: {
              user: err
            }
          });
        }
      });
  } catch (err) {
    if (err) {
      return res.status(422).json({
        errors: {
          user: err
        }
      });
    }
  }
}

//POST login route (optional, everyone has access)
function login(req, res, next) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(400).json(info);
    }
  )(req, res, next);
}

//change password za pomocą maila
//function changePassword()

module.exports = { register, login };
