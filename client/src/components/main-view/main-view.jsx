import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import {RegistrationView} from "../registration-view/registration-view";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = { movies: null, selectedMovie: null, user:null };
  }
  componentDidMount() {
    axios
      .get("https://padmaja-myflix.herokuapp.com/movies")
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  onLoggedIn(user){
  this.setState({
    user
  });
  }
  onButtonClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if(!user) return <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>;
    // Before the movies have been loaded

    if (!movies) return <div className="main-view" />;

    return (
      <div>
      <div className="main-view-styles text-center container-fluid">
      <div className = "container-fluid">
            <div className = "row">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onClick={() => this.onButtonClick()}
          />
        ) : (
          movies.map((movie) => (
          
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={(movie) => this.onMovieClick(movie)}
            />
            
            
          ))
        )}
        </div>
        </div>
      </div>
      </div>
    );
  }
}
