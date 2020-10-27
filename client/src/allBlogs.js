import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Header from './components/header'
import Footer from './components/footer'
import BlogThumbnail from './components/BlogThAllBlog'


/**
 * 
 * @param {props from parent componet} props 
 * All blog page, contains thumbnail for all blogs 
 */
function AllBlogs(props) {
    const [blogs, setBlogs] = useState(<h1>Loading....</h1>)
    
    useEffect(() => { // this hook is same as componetDidMount function in class based componet

        axios.get('/allBlogs').then((x) => { // getting data for all blogs and 
                                             // making array of thumbnails for every blog
            let newBlogList = x.data.map((i)=>{
                return <BlogThumbnail blogData={i} history={props.history}/>
            })
            setBlogs(newBlogList)
        })
    })

    return (
        <div>
            <Header  history={props.history}/>
            <div className='allBlogContent'>
                {blogs}
            </div>
            <Footer />
        </div>
    )
}

export default AllBlogs