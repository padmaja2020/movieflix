const express = require("express");
const app = express();
const morgan = require("morgan");
const uuid = require("uuid");
const bodyParser = require("body-parser");

let movieList = [
  {
    title: "Devil wears prada",
    genre: "Comedy",
    director: "David Frankel",
    description: "The Devil Wears Prada is a 2006 American comedy-drama film.",
    image: "",
    featured: true,
  },
  {
    title: "Mama Mia",
    genre: "Comedy",
    director: "Phyllida Lloyd",
    description:
      "Mamma Mia! (promoted as Mamma Mia! The Movie) is a 2008 jukebox musical film",
    image: "",
    featured: true,
  },
  {
    title: "Notting Hill",
    genre: "Romantic Comedy",
    director: "Roger Michell",
    description: "Notting Hill is a 1999 romantic comedy film .",
    image: "",
    featured: false,
  },
  {
    name: "Maleficent",
    genre: "Fantasy",
    director: "Robert Stromberg",
    description:
      "Maleficent is a 2014 American fantasy film starring Angelina Jolie as the title character.",
    image: "",
    featured: false,
  },

  {
    name: "Zootopia",
    genre: "Animated",
    director: " Byron Howard",
    description:
      "Zootopia  is a 2016 American 3D computer-animated buddy cop comedy film",
    image: "",
    featured: true,
  },
];

app.use(bodyParser.json());
//Logging using Morgan

app.use(morgan("common"));

//request to GET a list of all the movies
app.get("/movies", (req, res) => {
  res.json(movieList);
});

//request to get details about a single movie by title

app.get("/movies/:title", (req, res) => {
  let movie = movieList.find((movie) => {
    return movie.title === req.params.title;
  });
  if (movieList) {
    res.status(201).send(movie);
  } else {
    res.status(404).send("movie title not found");
  }
});

//request to get data about a genre by title

app.get("/movies/:title/genre", (req, res) => {
  res.send("Successful GET request returning the data about the genre");
});

//Request to get data about the director of the movie by title

app.get("/movies/director/:title", (req, res) => {
  res.send("Successful GET request returning the data about the director");
});

// Request to add a new user using POST

app.post("/users", (req, res) => {
  res.send("User has been successfully added");
});

//Request to update user info using PUT
app.put("/users/:username/:password/:email/:DOB", (req, res) => {
  res.send("User information has been updated");
});

//Request to allow user to add a movie to favorites
app.put("/users/:uername/:favorites", (req, res) => {
  res.send("Favorite movie has been added");
});

//Request to delete a movie from favorites
app.delete("/users/:username/:favorites", (req, res) => {
  res.send("Favorite movie has been deleted");
});

//Request to unregister a user
app.delete("/users/:username", (req, res) => {
  res.send("User has been unregistered");
});

//Serving static file using express.static()
app.use(express.static("public"));

// error handling middleware

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke");
});

//Listen for requests
app.listen(8080, (req, res) => {
  console.log("Port 8080  is running");
});
