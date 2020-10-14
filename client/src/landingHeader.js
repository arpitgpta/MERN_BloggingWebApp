import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LandingHeader(props) {
    const { isAuthenticated, loginWithPopup, logout } = useAuth0()
    return (
        <div className='landingDiv'>
            <div className="landingHeader">
                <img src='/images/landingBG.png' alt='background_pic' />
            </div>
            <div className="landingHeadingName">ContentWise</div>
            <div className='landingHeadingLinks'>
                <a href="/">Home</a>
                <div
                    onClick={() => {
                        if (isAuthenticated)
                            props.history.push('/allBlogs')
                        else
                            loginWithPopup()
                    }}
                >
                    All Blogs
                </div>
                <div
                    onClick={() => {
                        if (isAuthenticated) {
                            logout()
                        }
                        else
                            loginWithPopup()
                    }}
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
                </div>
            </div>
            <div className='landingHeaderQuote'>
                If you are being asked for someting more than once, <div
                    onClick={() => {
                        if (isAuthenticated)
                            props.history.push('/newBlog')
                        else {
                            loginWithPopup()
                        }
                    }}
                >
                    Blog It
                </div>
            </div>
        </div>
    )
}

export default LandingHeader