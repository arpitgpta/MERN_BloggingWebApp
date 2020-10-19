import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import ThumsUp from './thumsup'
import ThumsDown from './thumsdown'


/**
 * 
 * @param {properties from parent componet} props 
 * thumbnail for blog in landing page
 */
function BlogTH(props) {
    var b = props.blogData.body.substr(0, 195) + '......';
    var addr = '/blog/'+props.blogData._id
    const {isAuthenticated, user, loginWithPopup} = useAuth0()

    return (
        <div 
            className='blogThumbnail' 
            id={props.id} 
            name={props.blogData._id}
            
            
            /**
             * 
             * on click if loged in then sends to page of that blog
             * else pop up to login  
             *  
            */ 
            onClick={() => {
                console.log(user);
                if(isAuthenticated)
                {
                    props.history.push(addr)
                }
                else
                loginWithPopup()
            }}>
                
            <h3>{props.blogData.title}</h3>
            <p>By: {props.blogData.author}</p>
            <ThumsUp /> {props.blogData.likes}
            <br />
            <ThumsDown /> {props.blogData.dislikes}
            <hr />
            <p>{b}</p>
        </div>
    )
}

export default BlogTH