import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

export function GenreView (props){


    return(
        <div>
    
        <Card text = "light" bg = "dark">
        <Card.Body>
        <Card.Title>{props.genre.name}</Card.Title>
        <Card.Text>Description: {props.genre.Description}</Card.Text>
        <Link to = {`/`}>
            <Button variant = "link">Back</Button>
        </Link>

        </Card.Body>

        </Card>
        </div>


    )


}