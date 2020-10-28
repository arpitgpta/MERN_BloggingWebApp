import React from 'react'
import axios from 'axios'

/**
 * component for every author in landing page's popular author section
 * TODO: fetch original data and populate with that
 */



function AuthorThumbnail(){
    let uname ;
    function loadData(){

        axios.get('/getBlog/' + this.state.about).then((x) => { // here we are making proxy request 
                                                                // to another url i.e. server's url

            let addedOn = x.data.addedOn
            let y = +(addedOn.substr(0, 4))
            let m = +(addedOn.substr(5,2))
            let d = +(addedOn.substr(8,2))
            let date = new Date(y, m-1, d)
            let options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}
            let day = (date.toLocaleDateString('en-us', options))

            this.setState({ // update state with orignal values
                title: x.data.title,
                body: x.data.body,
                addedOn: day,
                author: x.data.author,
                likes: x.data.likes,
                dislikes: x.data.dislikes
            })
        })
    }




    return(
        <div className='authorThumbnail'>
            <div className="authorThumbnailPic"></div>
            <div className="authorThumbnailData">
                <h4>Mr. XYZ kkg</h4>
                <p>this is all about the author who is one of the most popular one among 500 aurhors of this site</p>
            </div>
        </div>
    )
}

export default AuthorThumbnail