const express = require("express");
const app = express();
const morgan = require("morgan");

let topMovies = [
  {
    name: "Devil wears prada",
    genre: "Comedy",
    Actor: "Meryl Streep",
  },
  {
    name: "Mama Mia",
    genre: "Comedy",
    Actor: "Meryl Streep",
  },
  {
    name: "Notting Hill",
    genre: "Romantic Comedy",
    Actor: "Julia Roberts",
  },
  {
    name: "Maleficent",
    genre: "Fantasy",
    Actor: "Angelina Jolie",
  },
  {
    name: "Pretty Woman",
    genre: "Romantic Comedy",
    Actor: "Julia Roberts",
  },
  {
    name: "Zootopia",
    genre: "Animated",
    Actor: "Ginnifer Goodwin",
  },
  {
    name: "Avengers: Infinity War",
    genre: "Action",
    Actor: "Robert downey jr",
  },
  {
    name: "Black Panther",
    genre: "Action",
    Actor: "Chadwick Boseman",
  },
  {
    name: "Pride and Prejudice",
    genre: "Drama",
    Actor: "Keira Knightley",
  },
  {
    name: "Legally Blonde",
    genre: "Romantic Comedy",
    Actor: "Reese Witherspoon",
  },
];
//Logging using Morgan

app.use(morgan("common"));

//GET requests
app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
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
  console.log("port is running");
});
