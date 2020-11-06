import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component{

    constructor(props){

        super(props);
        this.state={
           
                    username: "",
                    password: "",
                    email: "",
                    birthday: "",
                    favoriteMovies: [],
                    movies: [],  
        };
    }


    componentDidMount(){
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);

    }

    getUser(token) {
        const user = localStorage.getItem('user');
    
        axios
          .get(`https://padmaja-myflix.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
                        
                 this.setState({
                 username: res.data.Username,
                 password: res.data.Password,
                    email: res.data.Email,
                 birthday: res.data.Birthday,
                favoriteMovies: res.data.FavoriteMovies,
            }); 
          }) .catch(function (err) {
            console.log(err);
          });
      }

    //Unregister user


    deleteUser(e) {
        axios
          .delete(
            `https://padmaja-myflix.herokuapp.com/users/${localStorage.getItem('user')}`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
          )
          .then((response) => {
            alert('Account deleted');
            localStorage.removeItem('token', 'user');
            window.open('/');
          })
          .catch((event) => {
            alert('failed to delete user');
          });
      }

   
        render(){
            const {movies} = this.props;
            return(
                <div>
                    <Container>
                        <h1>My Profile</h1>
                        <br/>
                        <br/>
                        <br/>
                        <Card>
                        <Card.Body>
                        <Card.Text>Username: {this.state.username}</Card.Text>
                        <Card.Text>Password: XXXX</Card.Text>
                        <Card.Text>Email: {this.state.email}</Card.Text>
                        <Card.Text>Birthday: {this.state.birthday}</Card.Text>

                        <Link to = {`/update/${this.state.username}`}><Button variant = "link">Update Profile</Button></Link>
                        <Button variant = "link" onClick = {()=>this.deleteUser()}>Unregister</Button>
                        <Link to = {`/`}><Button variant = "link">Back</Button></Link>

                        </Card.Body>
                        </Card>                                      
                    </Container>
                </div>
            )
        }
}