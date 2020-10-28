import React, { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import Header from './components/header'
import Footer from './components/footer'
// import TopicThumnnail from './components/topicThumbnailSmall'


/**
 * 
 * @param {props form parent componet} props 
 * 
 * TODO: 
 *      1. we have to add bootstrap in form
 *      2. we have to make a input field in which we can type topic's name
 *      3. a button which on click adds that topic in tags array and makes that input field clear
 *      4. print all tags in array on screent in read only mode (we can give a button to delete that too)
 */
function Blog(props) {
    const { isAuthenticated, user } = useAuth0()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [author, setAuthor] = useState('')
    const [authorID, setAuthorID] = useState('')
    const tagString = useRef()

    useEffect(() => {
        tagString.current = JSON.stringify({tags:tags})
        console.log(tagString.current);

        if (isAuthenticated) {
            setAuthor(user.nickname)
            setAuthorID(user.sub)
        }
    }, [tags, isAuthenticated])

    function handelChangeTitle(event) {
        setTitle(event.target.value)
    }
    function handelChangeBody(event) {
        setBody(event.target.value)
    }

    function addTag(e) {
        if (e.target.value !== '') {
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
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

                <br />
                <input name='tagString' value={tagString.current} hidden />
                <br />
                {tags}
                <br />
                <button type='submit'>Add blog</button>
            </form>
            <input onKeyUp={e => e.key === 'Enter' ? addTag(e) : null} />
            <Footer />
        </div>
    )
}

export default Blog