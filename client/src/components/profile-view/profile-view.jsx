
import React, { useState } from "react";
import {connect} from 'react-redux';
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {setUsername} from '../../actions/actions';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/row";


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

  /**
   * Get the movies from the user's list 
   * @function getMovies
   * @param {string} token 
   */

  getMovies(token){
 
    axios.get("https://padmaja-myflix.herokuapp.com/movies",  { headers: { Authorization: "Bearer " + token },
  }).then(response =>{
      this.setState({movies:response.data});
    }).catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Get user's information 
   * @function @getUser
   * @param {string} token 
   */

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
        this.props.setUsername( res.data.Username);
        
        
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  

  /**
   * Delete the user
   *@function deleteUser
   */

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
        window.open("/client");
      })
      .catch((event) => {
        alert("failed to delete user");
      });
  }

  /**
   * Remove a movie from user's favorite movie list
   * @function removeFavorite
   * @param {string} movie 
   */

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
      
        

        <div className="userProfile" style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col>
              <Form style={{ width: "36rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.birthday}</Form.Label>
                </Form.Group>
                {
                  <Link to={`/update/${this.state.username}`}>
                    <Button variant="primary" type="link">
                      Updata Info
                    </Button>{' '}
                  </Link>
                }
                <Button variant="danger" onClick={() => this.handleDelete()}>
                  Delete Account
                </Button> {' '}
                <Link to={`/`}>
                  <Button variant="secondary" type="submit">
                    Back
                  </Button>
                </Link>
              </Form>
            </Col>
            <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "28rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card bg = "light" text = "dark">
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                          <Button variant = "info" size = "sm" onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                        </Card.Body>
                      </Card>
                     
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


// ProfileView.propTypes = {
//   movies: PropTypes.array.isRequired,
// };

export default connect(null, { setUsername })(ProfileView);










 