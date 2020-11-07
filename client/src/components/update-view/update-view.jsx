import axios from "axios";
import React, {useState} from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";


export function UpdateView(props){

const[username, setUsername] = useState('');
const[password,setPassword] = useState('');
const[email, setEmail]= useState('');
const[birthday,setBirthday]= useState('');


const handleUpdate = (e) => {
    e.preventDefault();
    const url =
      "https://padmaja-myflix.herokuapp.com/users/" +
      localStorage.getItem("user");
  
    axios.put(url,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        //props.setUsername(data.Username);
        alert("Your profile data was updated successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };



return(
        <div>
            <Form>
                <Form.Group controlId = "formGroupUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control value = {username} type = "text" placeholder = "Enter Userame" onChange = {(e)=> setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId = "formGroupPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control value = {password} type = "password" plceholder = "Enter Password" onChange = {(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                
                <Form.Group controlId = "formGroupEmail">
                     <Form.Label>Email:</Form.Label>
                    <Form.Control type = "email" value = {email} placeholder = "Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                 <Form.Group controlId = "formGroupBirthday">
                     <Form.Label>Birthday</Form.Label>
                    <Form.Control type = "string" value = {birthday} placeholder = "Enter Birthday" onChange = {(e)=>setBirthday(e.target.value)}/>
                </Form.Group>
                <Button variant = "primary" onClick = {handleUpdate}>Update Profile</Button>

            </Form>

        </div>


)

}