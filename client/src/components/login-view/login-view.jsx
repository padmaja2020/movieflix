import React, {useState} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./login-view.scss";
import { setUsername} from '../../actions/actions';


export function LoginView(props){

const [username, setUsername] = useState('');
const[password, setPassword] = useState('');

const handleSubmit = (e) => {
    // prevents the default refresh after submit button has been clicked
    e.preventDefault();
 
    /* Send a request to the server for authentication */
      axios
        .post('https://padmaja-myflix.herokuapp.com/login', {Username: username, Password: password})
        .then(response => {
          const data = response.data;
          // Send data to prop
           props.onLoggedIn(data);
         
           props.setUsername(username);
          
          })
        .catch(e => {
          console.log('no such user exists' + e.response);
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
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(null, { setUsername })(LoginView);