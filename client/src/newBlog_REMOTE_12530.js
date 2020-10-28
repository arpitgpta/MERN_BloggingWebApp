import React, { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
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
      <div>
        {/* { tags.push("Interesting")} */}
            <Header history={props.history} />

// <<<<<<< HEAD
            {/* <h1>New Blog</h1> */}
        <br/>
    <Container className="App"  >
        <Form 
            className="form" 
            id='newBlogForm' 
            action='/createNewBlog'
            onKeyPress={event => {      // Enter will not automatically submit
              if (event.which === 13 /* Enter */) {
                event.preventDefault();
              }
            }}
            style={{marginLeft:"80px"},{marginRight:"600px"}}
            method='Post' >
            <h2 style={{marginLeft:"130px", color:"#FF00FF", marginTop:"30px" }} >New Blog</h2>
          <Col>
            {/* <FormGroup> */}
              <input type='text' name='author' value={author} readOnly hidden />
            {/* </FormGroup> */}
            {/* <FormGroup> */}
// =======
            <h1>New Blog</h1>
            <form id='newBlogForm' action='/createNewBlog' method='Post'>
                <input type='text' name='author' value={author} readOnly hidden />
// >>>>>>> ad0450462ebd378a0ed8e2042bef780dfb408981
                <input type='text' name='authorID' value={authorID} readOnly hidden />
            {/* </FormGroup> */}
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handelChangeTitle}
              />
            </FormGroup>
            <FormGroup>
              {/* <br></br> */}
              <Label>Add tags</Label>
          {/* </Col> */}
              {/* {arr} */}
              {/* {console.log(arr)} */}
              <br/>
              <InputSkill className="tagss" />
              {/* <button type="button" name="tags" onClick={addNewTag} >add tags</button> */}
          
              
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              {/* <br></br> */}
              <Label>Blog</Label>
              {/* <Input */}
              <br></br>
              <textarea
                className="inputRounded"
                type="text"
                name="body"
                placeholder="Body"
                onChange={handelChangeBody}
                rows={4}
                cols={42.7}
                style={{borderRadius:"10px"}}
                >
                {/* // onChange={} */}
                {/* /> */}
              </textarea>
            </FormGroup>
          </Col>
            {/* <br/> */}
            <Button 
                name="tags" 
                onClick={addNewTag} 
                style={{marginLeft:"180px", color:"#FFFFFF"}} 
                type="submit">
                  Submit
            </Button>
        </Form>
    </Container>
            {arr}


// <<<<<<< HEAD
// =======
//                 <label>
//                     Title:
//                         <input type='text' name='title' value={title} onChange={handelChangeTitle} />
//                 </label>

//                 <label>
//                     Body:
//                         <textarea name='body' value={body} onChange={handelChangeBody}></textarea>
//                 </label>

//                 <br />
//                 <input name='tagString' value={tagString.current} hidden />
//                 <br />
//                 {tags}
//                 <br />
//                 <button type='submit'>Add blog</button>
//             </form>
//             <input onKeyUp={e => e.key === 'Enter' ? addTag(e) : null} />
// >>>>>>> ad0450462ebd378a0ed8e2042bef780dfb408981
            <Footer />
            
        </div>
    )
}

export default Blog



