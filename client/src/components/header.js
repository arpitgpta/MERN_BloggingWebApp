import React from "react";


// TODO: chagne login/logout on the basis of session 

function Header() {
    return (
        <div className="header">
            <div className="headingName">Contentwise</div>
            <div className='headingLinks'>
                <a href="/">Home</a>
                <a href="/allBlogs">All Blogs</a>
                <a href="/login">Login</a>
            </div>
        </div>
    );
}

export default Header;
