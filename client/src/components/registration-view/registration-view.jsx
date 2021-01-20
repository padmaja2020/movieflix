
import React, {useState} from 'react';
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./registration-view.scss";

export function RegistrationView(props){

const [username, setUsername]= useState('');
const[password,setPassword] = useState('');
const[email, setEmail]= useState('');
const[birthday,setBirthday]= useState('');

/**
 * Register a new user
 * @function handleSubmit
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {date} birthday
 */

const handleSubmit = (e) =>{
    e.preventDefault;
   
    axios.post("https://padmaja-myflix.herokuapp.com/users", {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday

    }).then(response =>{
        const data = response.data;
        window.open('/client', '_self');

    }).catch(e =>{
       console.log("Error registering the user");
        
        alert("Error registering the user" );
    });

}
return(

    

    <Form className = "registration-form ">
        <Form.Group controlId = "formGroupUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type = "text" value = {username} placeholder = 'Enter Username' onChange = {(e)=>setUsername(e.target.value)}/>
        </Form.Group>
       
       <Form.Group controlId = "formGroupPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type = "password" value = {password} placeholder = "Enter Password" onChange = {(e)=> setPassword(e.target.value)}/> 

       </Form.Group>

       <Form.Group controlId = "formGroupEmail">
           <Form.Label>Email:</Form.Label>
           <Form.Control type = "email" value = {email} placeholder = "Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
       </Form.Group>

       <Form.Group controlId = "formGroupBirthday">
           <Form.Label>Birthday</Form.Label>
           <Form.Control type = "string" value = {birthday} placeholder = "Enter Birthday" onChange = {(e)=>setBirthday(e.target.value)}/>
       </Form.Group>
       <Button variant = "primary" onClick = {handleSubmit}>Submit</Button>

    </Form>


)



}