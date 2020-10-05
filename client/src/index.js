import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './home.js'
import About from './about.js'
import Blog from './blog.js'
import Login from './login.js'
import Signup from './signup.js'


ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/about" component={About}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/signup" component={Signup}></Route>
    <Route path="/blog/:blogid" component={Blog}></Route>
  </BrowserRouter>,
  document.getElementById('root')
);

