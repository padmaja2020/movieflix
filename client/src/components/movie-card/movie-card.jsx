import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./movie-card.scss";
import {Link} from "react-router-dom";
import { CardDeck } from "react-bootstrap";



export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <div className = "col-md-4 movie-card-styles">
      
     <Card text = "light" bg = "dark" >
         <Card.Img variant = "top" height = "400px" width = "400px" src= {movie.Image}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
     
        <Card.Text>{movie.Description}</Card.Text>
        <Link to ={`/movies/${movie._id}`}>
        <Button variant = "link">Open</Button>
        </Link>

        
       </Card.Body>

</Card> 

     </div>
    );
  }
}



MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title:PropTypes.string.isRequired,
    Description:PropTypes.string.isRequired,
    Image:PropTypes.string.isRequired
  }).isRequired
  //onClick:PropTypes.func.isRequired
}

