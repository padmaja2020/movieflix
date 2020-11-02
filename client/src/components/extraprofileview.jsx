export class ProfileView extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: null,
        email: null,
        birthday: null,
        favoriteMovies: [],
        movies: [],
      };
    }
  
    componentDidMount() {
      //authentication
      const accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
    }
  
    getUser(token) {
      const username = localStorage.getItem('user');
  
      axios
        .get(`https://padmaja-myflix.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
  
        .then((res) => {
          this.setState({
            username: res.data.Username,
            password: res.data.Password,
            email: res.data.Email,
            birthday: res.data.Birthday,
            favoriteMovies: res.data.FavoriteMovies,
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  
    deleteFavoriteMovie(movieId) {
      console.log(this.props.movies);
      axios
        .delete(
          `https://padmaja-myflix.herokuapp.com/users/${localStorage.getItem(
            'user'
          )}/Movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        )
        .then((res) => {
          alert('Removed movie from favorites');
        })
        .catch((e) => {
          alert('error removing movie' + e);
        });
    }
  
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
  
    render() {
      const { movies } = this.props;
      //const favoriteMovieList = movies.filter((movie) =>
        //this.state.favoriteMovies.includes(movie._id)
      //);
      return (
        <div>
          <Container>
            <br />
            <br />
            <h1>My Profile</h1>
            <br />
            <Card>
              <Card.Body>
                <Card.Text>Username: {this.state.Username}</Card.Text>
                <Card.Text>Password: xxxxxx</Card.Text>
                <Card.Text>Email: {this.state.Email}</Card.Text>
                <Card.Text>Birthday {this.state.Birthday}</Card.Text>
                {/* Favorite Movies:
                {favoriteMovieList.map((movie) => (
                  <div key={movie._id} className='fav-movies-button'>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant='link'>{movie.Title}</Button>
                    </Link>
                    <Button
                      variant='dark'
                      onClick={(e) => this.deleteFavoriteMovie(movie._id)}
                    >
                      Remove Favorite
                    </Button>
                  </div>
                ))} */}
                <br />
                <br />
                <Link to={'/user/update'}>
                  <Button variant='dark'>Update Profile</Button>
                  <br />
                  <br />
                </Link>
                <Button variant='dark' onClick={() => this.deleteUser()}>
                  Delete User
                </Button>
                <br />
                <br />
                <Link to={`/`}>
                  <Button variant='dark'>Back</Button>
                </Link>
              </Card.Body>
            </Card>
          </Container>
        </div>
      );
    }
  }






//   //Navbar code

//   <Navbar sticky="top" expand="lg" className="mb-2 navbar-styles">
//   <Navbar.Brand className="navbar-brand">
//     <Link to={`/`}>Victorville Film Archives</Link>
//   </Navbar.Brand>
//   <Navbar.Toggle
//     aria-controls="basic-navbar-nav"
//     className="bg-light"
//   />
//   <Navbar.Collapse
//     className="justify-content-end navbar-light"
//     id="basic-navbar-nav"
//   >
//     {!user ? (
//       <ul>
//         <Link to={`/`}>
//           <Button variant="link">login</Button>
//         </Link>
//         <Link to={`/register`}>
//           <Button variant="link">Register</Button>
//         </Link>
//       </ul>
//     ) : (
//       <ul>
//         <Link to={`/`}>
//           <Button variant="link" onClick={() => this.logOut()}>
//             Log out
//           </Button>
//         </Link>
//         <Link to={`/users/`}>
//           <Button variant="link">Account</Button>
//         </Link>
//         <Link to={`/`}>
//           <Button variant="link">Movies</Button>
//         </Link>
//       </ul>
//     )}
//   </Navbar.Collapse>
// </Navbar>