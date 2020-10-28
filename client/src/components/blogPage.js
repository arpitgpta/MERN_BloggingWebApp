import React from 'react'
import axios from 'axios'

import Header from './header'
import Footer from './footer'
import ThumsUp from './thumsup'
import ThumsDown from './thumsdown'



// indivisual page for ever blog with expanded content 


// TODO: add like and dislike buttons and there backend logic 


class Blog extends React.Component {

    constructor(props) {
        super(props)
        this.state = { // initilize dummy states
            about: props.match.params.blogid,
            title: 'Loading.....',
            body: '',
            addedOn: '',
            author: '....',
            likes: '...',
            dislikes: '...',
            tags: []
        }
    }

    /**
     * function to fetch data from server
     */
    loadData = () => {

        axios.get('/getBlog/' + this.state.about).then((x) => { // here we are making proxy request 
            // to another url i.e. server's url

            let addedOn = x.data.addedOn
            let y = +(addedOn.substr(0, 4))
            let m = +(addedOn.substr(5, 2))
            let d = +(addedOn.substr(8, 2))
            let date = new Date(y, m - 1, d)
            let options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
            let day = (date.toLocaleDateString('en-us', options))

            this.setState({ // update state with orignal values
                title: x.data.title,
                body: x.data.body,
                blogId: x.data._id,
                addedOn: day,
                author: x.data.author,
                authorId: x.data.authorId,
                likes: x.data.likes,
                dislikes: x.data.dislikes,
                tags: x.data.tags.map(tag => <div className='blogpage-tag'>{tag}</div>)
            })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    likePost = () => {
        const authorId = this.state.authorId
        const blogId = this.state.blogId
        const data = {
            authorId, blogId
        };
        const url = '/like'
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url
        };
        axios(options).then(res => {
            if(res.data.likes !== -1)
            {
                this.setState({
                    likes: res.data.likes,
                    dislikes: res.data.dislikes
                })
            }
        })
    }

    disLikePost = () => {
        const authorId = this.state.authorId
        const blogId = this.state.blogId
//TODO:
        const data = {
            authorId, blogId
        };
        const url = '/dislike'
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url
        };
        axios(options).then(res => {

            this.setState({
                likes: res.data.likes,
                dislikes: res.data.dislikes
            })
        })
    }

    render() {
        return (
            <>
                <Header history={this.props.history} />{/* we need to send history property so that we can 
                                                           redirect from chied compont too  else we can do this
                                                           from componts in direct child fo Router tag only*/}
                <div className="blogPage">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.addedOn}</p>
                    <p>{this.state.tags}</p>
                    <p className="blogPageBody">{this.state.body}</p>
                </div>
                <div className="blogInfo">
                    <p>
                        By: {this.state.author}

                        <div className='like-button' onClick={this.likePost}>
                            <ThumsUp /> {this.state.likes}
                        </div>

                        <div className='dislike-button' onClick={this.disLikePost}>
                            <ThumsDown /> {this.state.dislikes}
                        </div>
                    </p>
                </div>
                <Footer />
            </>
        )
    }
}

export default Blog