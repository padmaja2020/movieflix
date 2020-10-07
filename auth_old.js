const jwtSecret = "your_jwt_secret";
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("./passport.js");

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

// let generateJWTToken = (user) => {
//   return jwt.sign(user, jwtSecret, {
//     subject: user.Username, // This is the username you’re encoding in the JWT
//     expiresIn: "7d", // This specifies that the token will expire in 7 days
//     algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
//   });
// };

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      console.log("User:" + error);
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};

// module.exports = (router) => {
//   router.post("/login", (req, res) => {
//     passport.authenticate("local", { session: false }, (error, user, info) => {
//       if (error || !user) {
//         res.status(500).json({
//           message: "Something is not right",
//           user: user,
//         });
//       }
//       req.login("user", { session: false }, (error) => {
//         if (error) {
//           res.status(500).send(error);
//         }
//       });
//       let token = generateJWTToken(user.toJSON());
//       return res.json({ user, token });
//     })(req, res);
//   });
// };
