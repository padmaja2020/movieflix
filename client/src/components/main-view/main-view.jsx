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


  getMovies(token){
    console.log("In the get Movies");
    axios.get("https://padmaja-myflix.herokuapp.com/movies",  { headers: { Authorization: "Bearer " + token },
  }).then(response =>{
      this.setState({movies:response.data});
    }).catch(function (error) {
      console.log(error);
    });
  }
  

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  onLoggedIn(authData){
    console.log(authData);
  this.setState({
    user:authData.user.Username
  });
  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
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
