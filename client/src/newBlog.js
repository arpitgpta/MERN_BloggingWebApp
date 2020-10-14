import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import Header from './components/header'
import Footer from './components/footer'
import TopicThumnnail from './components/topicThumbnailSmall'
// function handelChangeTitle(){
//     console.log('called');
// }

function Blog(props) {
    const { isAuthenticated, user } = useAuth0()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState(['abd', 'sdwe'])
    const [author, setAuthor] = useState('')
    const [authorID, setAuthorID] = useState('')
    const [newTag, setNewTag] = useState('')
    let topicss = []
    useEffect(() => {
        topicss = tags.map((i) => {
            return <TopicThumnnail topic={i}/>
        })
        if (isAuthenticated) {
            setAuthor(user.nickname)
            setAuthorID(user.sub)
        }
    })

    function handelChangeTitle(event) {
        setTitle(event.target.value)
    }

    function handelChangeBody(event) {
        setBody(event.target.value)
    }

    function handelChangeNewTag(event){
        setNewTag(event.target.value)
    }


    function addNewTag(){
        let newTagList = [...tags]
        newTagList.push(document.getElementById('newTagName').value)
        setTags(newTagList)
    }

    return (
        <div>
            <Header history={props.history} />
            <h1>New Blog</h1>
            <form id='newBlogForm' action='/createNewBlog' method='Post'>
                <input type='text' name='author' value={author} readOnly hidden />
                <input type='text' name='authorID' value={authorID} readOnly hidden />

                <label>
                    Title:
                        <input type='text' name='title' value={title} onChange={handelChangeTitle} />
                </label>

                <label>
                    Body:
                        <textarea name='body' value={body} onChange={handelChangeBody}></textarea>
                </label>
                <button type='submit'>Add blog</button>
            </form>
            <Footer />
        </div>
    )
}

export default Blog