import React from 'react'

import './index.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './home.js'
import NewBlog from './newBlog.js'
import Blog from './components/blogPage.js'
import Login from './login.js'
import Signup from './signup.js'
import AllBlogs from './allBlogs.js'


function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/allBlogs" component={AllBlogs}></Route>
            <Route exact path="/newBlog" component={NewBlog}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route path="/blog/:blogid" component={Blog}></Route>
        </BrowserRouter>
        // <>
        //     <button onClick={() => loginWithRedirect()}>
        //         login
        //     </button>
        //     <button onClick={() => logout()}>
        //         logout
        //     </button>
        //     <div>
        //         {console.log(user)}
        //     </div>
        // </>
    )
}

export default App