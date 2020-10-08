const express = require("express");
const app = express();
const morgan = require("morgan");
const uuid = require("uuid");
const bodyParser = require("body-parser");
let auth = require("./auth")(app);
const mongoose = require("mongoose");
const Models = require("./models.js");
const passport = require("passport");
require("./passport.js");
const Movies = Models.Movie;
const Users = Models.User;
const cors = require("cors");
app.use(cors());
const { check, validationResult } = require("express-validator");

//Connect to the mongo db
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
//Logging using Morgan

app.use(morgan("common"));

//request to GET a list of all the movies

app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error" + err);
      });
  }
);

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
            .send(
              "Username: " +
                user.Username +
                "\n Password:" +
                user.Password +
                "\n Email:" +
                user.Email +
                "\n Birthday:" +
                user.Birthday +
                "\n Favorite Movies:" +
                user.FavoriteMovies
            );
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
    let hashedPassword = Users.hashedPassword(req.body.Password);
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
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
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

// //Serving static file using express.static()
app.use(express.static("public"));

// // error handling middleware

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke");
});

//Listen for requests
app.listen(8080, (req, res) => {
  console.log("Port 8080  is running");
});
