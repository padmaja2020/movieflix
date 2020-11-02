import React, {useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./login-view.scss";


export function LoginView(props){

const [username, setUsername] = useState('');
const[password, setPassword] = useState('');

const handleSubmit = (e) => {
    // prevents the default refresh after submit button has been clicked
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
      axios
        .post('https://padmaja-myflix.herokuapp.com/login', {Username: username, Password: password})
        .then(response => {
          const data = response.data;
          // Send data to prop
           props.onLoggedIn(data);
          })
        .catch(e => {
          console.log('no such user');
        });
  };



  

return(
    <Form className = "login-form">
    <Form.Group controlId = "formGroupUsername">
    <Form.Label>Username:</Form.Label>
    <Form.Control type = "text" placeholder = "Enter Username" value = {username} onChange = {e => setUsername(e.target.value)}/>
    </Form.Group>

    <Form.Group controlId = "formGroupPassword">
    <Form.Label>Password:</Form.Label>
    <Form.Control type = "password" placeholder = "Enter Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
    
    </Form.Group>
    <Button variant = "primary" onClick = {handleSubmit}>Log In</Button>
    </Form>

);


} 