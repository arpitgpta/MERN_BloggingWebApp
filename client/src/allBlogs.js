import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Header from './components/header'
import Footer from './components/footer'
import BlogThumbnail from './components/BlogThAllBlog'

function AllBlogs(props) {
    const [blogs, setBlogs] = useState(<h1>Loading....</h1>)
    
    useEffect(() => {
        axios.get('/allBlogs').then((x) => {
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