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
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
            movies: [],

        };
    }

    componentDidMount(){
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);

    }
    // getUser(token){
    //     const username = localStorage.getItem('user');
    //     //get user info
    //     axios.get(`https://padmaja-myflix.herokuapp.com/users/${username}`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }).then((res)=>{

    //         this.setState({
    //             Username: res.data.Username,
    //             Password:res.data.Password,
    //             Email: res.data.Email,
    //             Birthday:res.data.Birthday,
    //             FavoriteMovies:res.data.FavoriteMovies

    //         });
    //         console.log(res.data);
          
           
    //       }).catch(function (err) {
    //         console.log(err);
    //       });
    // }

    getUser(token) {
        const username = localStorage.getItem('user');
    
        axios
          .get(`https://padmaja-myflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
    
          .then((res) => {
            this.setState({
              username: res.data.username,
            password: res.data.password,
              email: res.data.email,
              birthday: res.data.Birthday,
              favoriteMovies: res.data.FavoriteMovies,
            });
           
       
          })
          .catch(function (err) {
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

    // deleteUser(e){
    //     const username = localStorage.getItem('user');
    //     const token = localStorage.getItem('token');
    //     console.log("token" + token);
    //     axios.delete(`https://padmaja-myflix.herokuapp.com/users/${username}`, {
    //         headers:{Authorization:'Bearer ${token}'},
    //     }).then((res)=>{
    //         console.log(res);
    //         alert("User unregesitered");
    //         localStorage.removeItem('token', 'username');
    //         window.open('/');
    //     }).catch(function(err){
    //         console.log(err);
    //         alert("could not delete user");
    //     });



   // }

        render(){
            const {movies} = this.props;
            const username = localStorage.getItem('user');
         
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
                        <Card.Text>Password: </Card.Text>
                        <Card.Text>Email: {this.state.Email}</Card.Text>
                        <Card.Text>Birthday: {this.state.Birthday}</Card.Text>

                        <Link to = {`/update/${username}`}><Button variant = "link">Update Profile</Button></Link>
                        <Button variant = "link" onClick = {()=>this.deleteUser()}>Unregister</Button>
                        <Link to = {`/`}><Button variant = "link">Back</Button></Link>

                        </Card.Body>
                        </Card>                                      
                    </Container>

                </div>


            )


        }
    
}