const express = require("express");
const app = express();
const morgan = require("morgan");
const uuid = require("uuid");
const bodyParser = require("body-parser");

let movies = [
  {
    Title: "Devil wears prada",
    Genre: {
      name: "Comedy",
      Description: "",
    },
    Director: {
      Name: "David Frankel",
      Bio: "",
      Birth: "",
    },
    Description: "The Devil Wears Prada is a 2006 American comedy-drama film.",
    Image: "",
    Featured: true,
  },
  {
    Title: "Mama Mia",
    Genre: {
      Name: "Comedy",
      Description: "",
    },
    Director: {
      Name: "Phyllida Lloyd",
      Bio: "",
      Birth: "",
    },

    Description:
      "Mamma Mia! (promoted as Mamma Mia! The Movie) is a 2008 jukebox musical film",
    Image: "",
    Featured: true,
  },
  {
    Title: "Notting Hill",
    Genre: {
      Name: "Comedy",
      Description: "",
    },
    Director: {
      Name: "Phyllida Lloyd",
      Bio: "",
      Birth: "",
    },

    Description: "Notting Hill is a 1999 romantic comedy film .",
    Image: "",
    Featured: false,
  },
  {
    Title: "Maleficent",
    Genre: {
      Name: "Comedy",
      Description: "",
    },
    Director: {
      Name: "Phyllida Lloyd",
      Bio: "",
      Birth: "",
    },

    Description:
      "Maleficent is a 2014 American fantasy film starring Angelina Jolie as the Title character.",
    Image: "",
    Featured: false,
  },

  {
    Title: "Zootopia",
    Genre: {
      Name: "Comedy",
      Description: "",
    },
    Director: {
      Name: "Phyllida Lloyd",
      Bio: "",
      Birth: "",
    },

    Description:
      "Zootopia  is a 2016 American 3D computer-animated buddy cop comedy film",
    Image: "",
    Featured: true,
  },
];
let users = [
  {
    id: 1,
    Username: "Padmaja",
    Password: "1234",
    Email: "pv4@gmail.com",
    Birthday: "01/01/2001",
    FavoriteMovies: [],
  },
  {
    id: 2,
    Username: "Ravi",
    Password: "5678",
    Email: "rj4@yahoo.com",
    Birthday: "01/02/2000",
    FavoriteMovies: [],
  },
  {
    id: 3,
    Username: "Navya",
    Password: "4444",
    Email: "navya@gmail.com",
    Birthday: "04/08/2000",
    FavoriteMovies: [],
  },
];
app.use(bodyParser.json());
//Logging using Morgan

app.use(morgan("common"));

//request to GET a list of all the movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

//request to get details about a single movie by title

app.get("/movies/:Title", (req, res) => {
  let movie = movies.find((movie) => {
    return movie.Title === req.params.Title;
  });
  if (movieList) {
    res.status(201).send(movie);
  } else {
    res.status(404).send("movie title not found");
  }
});

//request to get data about a genre by title

app.get("/movies/genres/:Name", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.Genre.Name === req.params.Name;
    })
  );
});

// app.get("/movies/:Title/Genre", (req, res) => {
//   res.send("Successful GET request returning the data about the genre");
// });

//Request to get data about the director of the movie by title

app.get("/movies/director/:Name", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.Director.Name === req.params.Name;
    })
  );
});

// app.get("/movies/director/:title", (req, res) => {
//   res.send("Successful GET request returning the data about the director");
// });

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:Username", (req, res) => {
  res.json(
    users.find((user) => {
      return user.Username === req.params.Username;
    })
  );
});
app.put("/users/:Username", (req, res) => {
  res.json(
    users.find((user) => {
      return user.Username === req.params.Username;
    })
  );
});
app.delete("/users/:Username", (req, res) => {
  res.status(500).send("User deleted");
});

// Request to add a new user using POST

app.post("/users", (req, res) => {
  res.send("User has been successfully added");
});

//allows user to add movie to favorites
app.post("users/:Username/favorites", (req, res) => {
  res.status(500).send("Succesfully added movie to favorites!");
});

//allows user to remove movie from favorites
app.delete("users/:Username/favorites", (req, res) => {
  res.status(500).send("Successfully removed movie from favorites.");
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

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
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
