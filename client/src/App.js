import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      message: ''
    };
    this.handleLogedIn = this.handleLogedIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGetInfo = this.handleGetInfo.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.handleLogOut();
  }

  handleLogedIn() {
    this.setState({ loggedIn: true });
  }

  handleSignUp(email, password) {
    axios
      .post('/api/signup', { email: email, password: password })
      .then(res => {
        if (!res.data.errors) this.setState({ loggedIn: true });
        console.log(res.data.errors);
      })
      .catch(err => console.log(err));
  }

  handleGetInfo() {
    axios
      .get('/api/info')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  handleLogOut() {
    axios
      .get('/logout')
      .then(res => {
        console.log(res.data);
        this.setState({ loggedIn: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/dashboard">
                {this.state.loggedIn ? (
                  <h1>dashboard</h1>
                ) : (
                  <Redirect
                    to={{
                      pathname: '/signin'
                    }}
                  />
                )}
              </Route>
              <Route path="/signin">
                <LoginForm handleLogedIn={this.handleLogedIn} />
              </Route>
              <Route path="/signup">
                <SignupForm handleSignUp={this.handleSignUp} />
              </Route>
              <Route path="/">
                <h1>Home</h1>
              </Route>
            </Switch>
          </div>
        </Router>

        {/* 
        {this.state.loggedIn ? (
          <h1>You are logged in</h1>
        ) : (
          <div>
            <p>Sign In</p>
            <LoginForm
              handleLogIn={this.handleLogIn}
              message={this.state.message}
            />
            <p>Sign Up</p>
            <SignupForm handleSignUp={this.handleSignUp} />
          </div>
        )} */}
      </div>
    );
  }
}

export default App;
