import React from 'react'
import AuthorThumbnail from './components/authorThumbnail'


function PopularAuthors(){
    return(
        <div className='popularAuthors'>
            <div className='popularAuthorsHeading'>
                Celibrity Authors <span role='img' aria-label='bookey'>🎉🎉</span>
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