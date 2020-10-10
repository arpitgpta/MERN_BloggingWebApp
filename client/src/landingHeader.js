import React from 'react'

function landingHeader(){
    return(
        <div className='landingDiv'>
            <div className="landingHeader">
                <img src='/images/landingBG.png' alt='background_pic'/>
            </div>
            <div className="headingName">Contentwise</div>
            <div className='headingLinks'>
                <a href="/">Home</a>
                <a href="/allBlogs">All Blogs</a>
                <a href="/login">Login</a>
            </div>
            <div className='headerQuote'>
                If you are being asked for someting more than once, <a className=" headerQuoteButton" href="/newBlog">Blog It</a>
            </div>
        </div>
    )
}

export default landingHeader