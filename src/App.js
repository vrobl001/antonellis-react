import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import userService from './utils/userService';
import logo from './logo.svg';
import './App.css';

// Reusable Components
import Navbar from './components/Navbar/Navbar';

// Page Components
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Catering from './pages/Catering/Catering';
import Blog from './pages/Blog/Blog';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

export default class App extends Component {
  state = this.initialState;
  get initialState() {
    return {
      user: userService.getUser(),
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState(this.initialState);
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  render() {
    return (
      <div className='app-outer-container'>
        <Navbar user={this.state.user} handleLogout={this.handleLogout} />
        <div className='app-inner-container'>
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/menu' render={() => <Menu />} />
            <Route exact path='/catering' render={() => <Catering />} />
            <Route exact path='/blog' render={() => <Blog />} />
            <Route
              exact
              path='/login'
              render={(props) => <Login {...props} handleSignupOrLogin={this.handleSignupOrLogin} />}
            />
            <Route
              exact
              path='/signup'
              render={(props) => <Signup {...props} handleSignupOrLogin={this.handleSignupOrLogin} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
