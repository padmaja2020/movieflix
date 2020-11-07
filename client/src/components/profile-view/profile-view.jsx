import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
    this.getMovies(accessToken);
  }


  getMovies(token){
 
    axios.get("https://padmaja-myflix.herokuapp.com/movies",  { headers: { Authorization: "Bearer " + token },
  }).then(response =>{
      this.setState({movies:response.data});
    }).catch(function (error) {
      console.log(error);
    });
  }

  getUser(token) {
    const user = localStorage.getItem("user");

    axios
      .get(`https://padmaja-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          username: res.data.Username,
          password: res.data.Password,
          email: res.data.Email,
          birthday: res.data.Birthday,
          favoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //Unregister user

  deleteUser(e) {
    axios
      .delete(
        `https://padmaja-myflix.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        alert("Account deleted");
        localStorage.removeItem("token", "user");
        window.open("/");
      })
      .catch((event) => {
        alert("failed to delete user");
      });
  }

  //remove favorite movie

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://padmaja-myflix.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
   
    axios
      .put(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.componentDidMount();
      });
      alert("Movie has been removed");
  }

  render() {
    const { movies } = this.state;
  
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    
    return (
      <div>
        <Container>
          <h1>My Profile</h1>
          <br />
          <br />
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.username}</Card.Text>
              <Card.Text>Password: XXXX</Card.Text>
              <Card.Text>Email: {this.state.email}</Card.Text>
              <Card.Text>Birthday: {this.state.birthday}</Card.Text>

              <Link to={`/update/${this.state.username}`}>
                <Button variant="link">Update Profile</Button>
              </Link>
              <Button variant="link" onClick={() => this.deleteUser()}>
                Unregister
              </Button>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
              <Col>
              <div
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "28rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie)=> {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
