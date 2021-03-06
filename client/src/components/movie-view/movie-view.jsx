import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  /**
   * Add user's favorite movie
   * @function addFavorite
   * @param {string} movie 
   */

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://padmaja-myflix.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

   
    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
      
        window.open("/client", "_self");
      });
      alert("Movie has been added");
  }

  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    return (
      <div>
      <Card text= "light" bg = "dark" style={{ width: '20rem' }}>
        <Card.Img variant ="top"  height = "400px" width = "400px" src ={movie.Image} />
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Genre: {movie.Genre.name} </Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Link to = {`/`}>
        <Button variant= "info" size = "sm" type= "link">Back</Button>{' '}
        </Link>
        <Button variant = "info" size = "sm" type="link" onClick={() => this.addFavorite(movie)}>
            Add Favorite
          </Button>
        </Card.Body>
      </Card>
     </div>
    );
  }
}
