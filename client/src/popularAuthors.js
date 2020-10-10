import React from 'react'
import AuthorThumbnail from './components/authorThumbnail'


function PopularAuthors(){
    return(
        <div className='popularAuthors'>
            <div className='popularAuthorsHeading'>
                Celibrity Authors
            </div>
            <div className="popularAuthorContent">
                <AuthorThumbnail/>
                <AuthorThumbnail/>
                <AuthorThumbnail/>
                <AuthorThumbnail/>
                <AuthorThumbnail/>
            </div>
        </div>
    )
}

export default PopularAuthors