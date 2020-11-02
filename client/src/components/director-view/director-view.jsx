import React from "react";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export function DirectorView(props){
    
    return(
        <div>
        <Card text = "light" bg = "dark">
        <Card.Body>
        <Card.Text>Director Name: {props.director.Name}</Card.Text>
        <Card.Text>Director Bio: {props.director.Bio}</Card.Text>
        <Card.Text>Director Birth Date: {props.director.Birth}</Card.Text>
        <Link to = {`/`}>
            <Button variant = "link">Back</Button>
        </Link>
        </Card.Body>
           
        </Card>

        </div>
    );
}