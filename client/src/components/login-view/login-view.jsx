import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./login-view.scss";



export function LoginView(props){

const [username, setUsername] = useState('');
const[password, setPassword] = useState('');

const handleSubmit = (e)=>{
e.preventDefault();
    console.log(username, password)
props.onLoggedIn(username);

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