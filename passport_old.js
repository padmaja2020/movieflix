// const passport = require("passport");
// LocalStrategy = require("passport-local").Strategy;
// Models = require("./models.js");
// passportJWT = require("passport-jwt");

// let Users = Models.User;
// JWTStrategy = passportJWT.Strategy;
// ExtractJWT = passportJWT.ExtractJwt;

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(username + "  " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        if (!user) {
          console.log("incorrect username");
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        }

        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "Username",
//       passwordField: "Password",
//     },
//     (username, password, callback) => {
//       console.log("username" + " " + "password");
//       Users.findOne({ Username: username }, (error, user) => {
//         if (error) {
//           console.log("error");
//           return callback(error);
//         }
//         if (!user) {
//           console.log("incorrect username");
//           return callback(null, false, {
//             message: "Incorrect username or password.",
//           });
//         }

//         console.log("finished");
//         return callback(null, user);
//       });
//     }
//   )
// );

// var opts = {};
// opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "your_jwt_secret";

// passport.use(
//   new JWTStrategy(opts, (jwtPayload, callback) => {
//     return Users.findById(jwtPayload._id)
//       .then((user) => {
//         return callback(null, user);
//       })
//       .catch((error) => {
//         return callback(error);
//       });
//   })
// );

//
// {
//   "user": {
//       "FavoriteMovies": [],
//       "_id": "5f7e22d3999137171007c454",
//       "Username": "PVR",
//       "Password": "2222",
//       "Email": "pvr@gmail.com",
//       "Birthday": "2000-01-01T00:00:00.000Z",
//       "__v": 0
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjVmN2UyMmQzOTk5MTM3MTcxMDA3YzQ1NCIsIlVzZXJuYW1lIjoiUFZSIiwiUGFzc3dvcmQiOiIyMjIyIiwiRW1haWwiOiJwdnJAZ21haWwuY29tIiwiQmlydGhkYXkiOiIyMDAwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJfX3YiOjAsImlhdCI6MTYwMjEwMjAyOCwiZXhwIjoxNjAyNzA2ODI4LCJzdWIiOiJQVlIifQ.ftoCLkLFALFFN0xGfC-ba5Kp9EZ45Ttx-Zo3URlgC4k"
// }
