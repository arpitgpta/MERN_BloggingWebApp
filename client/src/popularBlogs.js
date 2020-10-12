import React from 'react'
import BlogThumbnail from './components/blogThubnail.js'

function PopularBlogs(props){
    return(
        <div className='popularBlogs'>
            <div className='popularBlogsHeading'>
                Some Most Popular Blogs
            </div>
            <div className='popularBlogsContent'>
                <BlogThumbnail id="th1" blogData={props.blogs[0]}/>
                <BlogThumbnail id="th2" blogData={props.blogs[1]}/>
                <BlogThumbnail id="th3" blogData={props.blogs[2]}/>
                <BlogThumbnail id="th4" blogData={props.blogs[3]}/>
                <BlogThumbnail id="th5" blogData={props.blogs[4]}/>
                <BlogThumbnail id="th6" blogData={props.blogs[5]}/>
                <BlogThumbnail id="th7" blogData={props.blogs[6]}/>
                <BlogThumbnail id="th8" blogData={props.blogs[7]}/>
            </div>
        </div>
    )
}

export default PopularBlogs