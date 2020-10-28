import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

import Header from './components/header'
import Footer from './components/footer'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header'
import Footer from './components/footer'

// import Example from './components/newblogform'
// import InputSkill from './components/InputSkill'
import TopicThumnnail from './components/topicThumbnailSmall'
import { ADDRCONFIG } from 'dns';
import InputSkill from './components/InputSkill';
import arr from './components/InputSkill';



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
    const [tagString, setTagString] = useState('')
    const [tagsArray, setTagsArray] = useState([])
    
    const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    
    useEffect(() => {
        setTagString(JSON.stringify({ tags: tags }))
        setTagsArray(tags.map((tag, index) => (
            <span key={index} className="tag">
                <span className='tag-title'>{tag}</span>
                <span className='tag-close-icon' onClick={() => removeTags(index)}>x</span>
            </span>
        )))
// <<<<<<< akg
//     const tagString = useRef()
// =======
// <<<<<<< HEAD
    const [newTag, setNewTag] = useState('')
    let topicss = []
    // let tags = []
    useEffect(() => {
        // topicss = tags.map((i) => {
        //     return <TopicThumnnail topic={i}/>
        // })
// =======
// >>>>>>> saki

    useEffect(() => {
// <<<<<<< akg
        tagString.current = JSON.stringify({tags:tags})
        console.log(tagString.current);

// =======
        topics = tags.map((i) => {
            return <TopicThumnnail topic={i} />
        })
// >>>>>>> ad0450462ebd378a0ed8e2042bef780dfb408981
// >>>>>>> saki
        if (isAuthenticated) {
            setAuthor(user.nickname)
            setAuthorID(user.sub)
        }
        // eslint-disable-next-line
    }, [tags, isAuthenticated])

    function handelChangeTitle(event) {
        setTitle(event.target.value)
    }
    function handelChangeBody(event) {
        setBody(event.target.value)
        setTags(arr)
    }

// <<<<<<< akg
    function addTag(e) {
        if (e.target.value !== '') {
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
// =======
// <<<<<<< HEAD
    function handelChangeNewTag(event){
        setNewTag(event.target.value)
        // tag.push
        // console.log(newTag)
        tags.push(event.target.value)
        // {tags}
    }
    

    // Idhar kachara hai kyu ki alag alag method try kar raha tha array ko
    // backend mai send karne ke liye

    function addNewTag(){
        // let newTagList = [...tags]
        // {'saket'}
        // newTagList.push(document.getElementById('newTagName').value)
        // tags = arr
        setTags(arr)
        // tags.push(document.getElementById('newTagName').value)
        // document.getElementById('newTagName').value = "" ;
        // tag = newTagList
        // {newTagList}
        // console.log(newTagList)
// =======

    function handelSubmit(event) {
        console.log(event.screenX);
        console.log('called');
        event.preventDefault();
    }

    function addTag(e) {
        setTags([...tags, e.target.value])
        e.target.value = ''
        setTimeout(()=>{console.log(tags);},2000)
        
// >>>>>>> ad0450462ebd378a0ed8e2042bef780dfb408981
// >>>>>>> saki
    }
    return (
        <>
            <Header history={props.history} />
            <div className='new-blog'>
                <h2>New Blog</h2>
                <Form id='newBlogForm' action='/createNewBlog' method='Post'>
                    <input type='text' name='author' value={author} readOnly hidden />
                    <input type='text' name='authorID' value={authorID} readOnly hidden />
                    <FormGroup>
                        <Label>Title:</Label>
                        <Input type='text' name='title' value={title} onChange={handelChangeTitle} autoComplete={'off'} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Body:</Label>
                        <Input type='textarea' rows={8} name='body' value={body} onChange={handelChangeBody} />
                    </FormGroup>

                    <input name='tagString' value={tagString} readOnly hidden />

                    <Button color='success' type='submit' className='submit-button'>Add blog</Button>
                </Form>
                <br />

                <div className='tag-field-container'>
                    <Label>Tags:</Label>
                    <div className='tags-field'>
                        <span className='display-tags'> {tagsArray} </span>
                            <input placeholder={'Press Enter to add tag'} onKeyUp={e => e.key === 'Enter' ? addTag(e) : null} />
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog



