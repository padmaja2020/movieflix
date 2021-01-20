
import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";

import { setMovies, setUsername} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import {RegistrationView} from "../registration-view/registration-view";
import {DirectorView} from "../director-view/director-view";
import {GenreView} from "../genre-view/genre-view";
import {ProfileView} from "../profile-view/profile-view";
import {UpdateView} from "../update-view/update-view";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./main-view.scss";
import Row from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";





export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    //this.state = { movies: [], selectedMovie: null, user:null };
   // this.state = {user:null};
  }

  /**
   * Get movies from database
   * @function getMovies
   * @param {string} token 
   */

  getMovies(token){
 
    axios.get("https://padmaja-myflix.herokuapp.com/movies",  { headers: { Authorization: "Bearer " + token },
  }).then(response =>{
      //this.setState({movies:response.data});
      //this.props.setMovies({movies:response.data});
      this.props.setMovies(response.data);
    
    }).catch(function (error) {
      console.log(error);
    });
  }
  

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
     // this.setState({
       // user: localStorage.getItem('user')
      // this.props.setUsername(localStorage.getItem('user'));
       this.props.setUsername(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

  /**
   * Save user information in localStorage
   * @function onLoggedIn
   * 
   */
  onLoggedIn(authData){
  // this.setState({
  //   user:authData.user.Username
  // });
  //this.props.setUsername(authData.user.Username);
  //console.log("AuthData onloogedon" + authdata);
  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
  }

  

  onButtonClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  /**
   * Logs the user out
   * @function logOut
   */
  logOut() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
   // this.setState({
     // user: null,
    //});
    //this.props.setUsername(null);
    
    window.open("/client", "_self");
  }

  render() {
    //const { movies, user } = this.state;
    // let {movies} = this.props;
    // let {user} = this.props;

     let { movies, user } = this.props;
    
    // Before the movies have been loaded

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename = "/client">
        <div className = "main-view-styles text-center container-fluid">
          <Navbar  sticky="top" expand="lg" bg = "dark">
         <Navbar.Brand>  <Link to ={`/`}>  MovieFlix</Link></Navbar.Brand>
         <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
         <Navbar.Collapse  className="justify-content-end navbar-light">

           {!user?(<ul>
              <Link to = {`/`}>
              <Button variant = "link">Login</Button></Link>
              <Link to = {`/register`}><Button variant = "link">Register</Button></Link>

           </ul>):(<ul>
           <Link to = {`/`}><Button variant = "link" onClick ={()=>this.logOut()}>Log Out</Button></Link>
          
           <Link to = {`/users`}><Button variant = "link">Account</Button></Link>
           <Link to = {`/`}><Button variant = "link">Movies</Button></Link>
           </ul>)}
         </Navbar.Collapse>
          </Navbar>
     
          <div className = "container-fluid">
            <div className = "row">
              <Route exact path = "/" 
              render = {()=>{
                if(!user) return <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>;
                return  <MoviesList movies={movies}/>;
              }
              }/>
              
              <Route path = "/register"
              render = {()=> <RegistrationView />}/>
              <Route path = "/movies/:movieId"
               render ={({match})=> <MovieView movie = {movies.find(m=>m._id === match.params.movieId)}/>}/>
               <Route path = "/director/:name"
               render = {({match}) =>{
                if (!movies) return <div className="main-view"/>;
               return <DirectorView director = {movies.find(m=>m.Director.Name === match.params.name).Director} />
              
               }}/>    
                <Route path = "/genre/:name"
               render = {({match}) => {
                if (!movies) return <div className="main-view"/>;
                return <GenreView genre = {movies.find(m=>m.Genre.name === match.params.name).Genre} />
               }}/>
              <Route path = "/users"
                render = {()=> <ProfileView movie = {movies}/>}/>
              

              <Route path = "/update/:username"
              render = {()=> <UpdateView />}/>

            </div>

          </div>

        </div>


      </Router>

    );
  }
}

let mapStateToProps = state => {

  //return { movies: state.movies, user:state.user }
  return { movies: state.movies, user: state.user };
}


export default connect(mapStateToProps, { setMovies, setUsername } )(MainView);