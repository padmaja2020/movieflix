import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    return (
      <div>
      <Card text = "light" bg = "dark" style={{ width: '20rem' }}>
        <Card.Img variant ="top"  height = "400px" width = "400px" src ={movie.Image} />
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Genre: {movie.Genre.name} </Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Link to = {`/`}>
        <Button variant = "link">Back</Button>

        </Link>
        </Card.Body>
      </Card>
     </div>
    );
  }
}
