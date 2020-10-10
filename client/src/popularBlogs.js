import React from 'react'
import BlogThumbnail from './components/blogThubnail.js'

function PopularBlogs(){
    return(
        <div className='popularBlogs'>
            <div className='popularBlogsHeading'>
                Some Most Popular Blogs
            </div>
            <div className='popularBlogsContent'>
                <BlogThumbnail id="th1"/>
                <BlogThumbnail id="th2"/>
                <BlogThumbnail id="th3"/>
                <BlogThumbnail id="th4"/>
                <BlogThumbnail id="th5"/>
                <BlogThumbnail id="th6"/>
                <BlogThumbnail id="th7"/>
                <BlogThumbnail id="th8"/>
            </div>
        </div>
    )
}

export default PopularBlogs