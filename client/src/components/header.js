import React from "react";


// TODO: chagne login/logout on the basis of session 

function Header() {
    return (
        <nav class="navbar navbar-expand-md navbar-light ">
            <a class="navbar-brand" href="/">
                Contentwise
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                        <a className="nav-link" href="/about">
                            About us
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" href="/allPost">
                            All Post
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">
                            Signup
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="loginBtn nav-link btn btn-primary btn-sm" href="/login">
                            <span className="loginBtn">Login</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
