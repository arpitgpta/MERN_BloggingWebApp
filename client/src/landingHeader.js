import React from 'react'

function landingHeader(){
    return(
        <div className='landingDiv'>
            <div className="landingHeader">
                <img src='/images/landingBG.png' />
            </div>
            <div className="headingName">Contentwise</div>
            <div className='headingLinks'>
                <a>Home</a>
                <a>All Blogs</a>
                <a>Login</a>
            </div>
            <div className='headerQuote'>
                If you are being asked for someting more than once, <a className=" headerQuoteButton">Blog It</a>
            </div>
        </div>
    )
}

export default landingHeader