const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const morgan = require("morgan");
const uuid = require("uuid");

const passport = require("passport");
require("./passport.js");

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

//Connect to the mongo db

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

const { check, validationResult } = require("express-validator");
const cors = require("cors");
app.use(cors());


var allowedOrigins = ['http://localhost:8080', 'http://localhost:50668', 'http://localhost:1234', 'https://padmaja-myflix.herokuapp.com',];
// CORS - Allowed origins/domains
app.use(cors({                                                             
  
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
  
    return callback(null, true);
  }
}));


//Middleware
//Logging using Morgan
app.use(morgan("common"));
app.use(bodyParser.json());

let auth = require("./auth")(app);
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });



//request to GET a list of all the movies

app.get("/movies",passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error" + err);
    });
});

// //request to get details about a single movie by title

app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        if (movie) {
          res.json(movie);
        } else {
          res.status(500).send("Movie not found" + req.body.Title);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error" + err);
      });
  }
);

// //request to get data about a genre by title

app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.Name);
    Movies.findOne({ "Genre.name": req.params.Name })
      .then((movie) => {
        if (movie) {
          res
            .status(201)
            .send(req.params.Name + ":  " + movie.Genre.Description);
        } else {
          res.status(500).send("Genre not found");
        }
      })
      .catch((err) => {
        res.status(500).send("Error" + err);
      });
  }
);

// //Request to get data about the director of the movie by title

app.get(
  "/movies/director/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((movie) => {
        if (movie) {
          res
            .status(200)
            .send(
              "Director Name:   " +
                movie.Director.Name +
                "\n Bio:   " +
                movie.Director.Bio +
                "\nBirth Date:   " +
                movie.Director.Birth
            );
        } else {
          res.status(500).send("Director does not exist");
        }
      })
      .catch((err) => {
        //console.error(err);
        res.status(500).send("Director does not exist");
      });
  }
);

//Get request to return list of users.
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        if (users) {
          res.status(201).json(users);
        } else {
          res.status(500).send("Error occured");
        }
      })
      .catch((err) => {
        res.status(500).send("Error" + err);
      });
  }
);

//Get user info by Username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        if (user) {
          res
            .status(201)
            .send(user);
        } else {
          res.status(500).send("User does not exist");
        }
      })
      .catch((err) => {
        res.status(500).send("Error" + err);
      });
  }
);

//Request to add a new user using POST

app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username does not contain alphanumeric characters-not allowed"
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email is not valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          res.status(500).send("Username already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              res.status(500).send("Error" + err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send("Error" + err);
      });
  }
);

//Unregister a user
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(500).send("Username " + req.params.Username + "not found");
        } else {
          res
            .status(201)
            .send(
              "User with Username  " + req.params.Username + " has been deleted"
            );
        }
      })
      .catch((err) => {
        res.status(500).send("Error" + err);
      });
  }
);

//Request to update user info using PUT
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
    
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          res.status(500).send("error" + err);
        } else {
          res.status(201).json(updatedUser);
        }
      }
    );
  }
);

//allows user to add movie to favorites
app.post(
  "/users/:Username/movies/:MovieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieId } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.log(err + "Error");
          res.status(500).send("Error" + err);
        } else {
          res.status(201).json(updatedUser);
        }
      }
    );
  }
);

//allows user to remove movie from favorites
app.put(
  "/users/:Username/movies/:MovieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieId } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.log(err + "Error");
          res.status(500).send("Error" + err);
        } else {
          res.status(201).json(updatedUser);
        }
      }
    );
  }
);

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// //Serving static file using express.static()
app.use(express.static("public"));

app.use("/client", express.static(path.join(__dirname, "client", "dist")));


app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// // error handling middleware

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke");
});

//Listen for requests

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", (req, res) => {
  console.log("Listening to port" + port);
});



















