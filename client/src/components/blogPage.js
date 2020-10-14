import React from 'react'
import axios from 'axios'

import Header from './header'
import Footer from './footer'


class Blog extends React.Component {

    loadData = () => {
        axios.get('/getBlog/' + this.state.about).then((x) => {
            let addedOn = x.data.addedOn
            let y = +(addedOn.substr(0, 4))
            let m = +(addedOn.substr(5,2))
            let d = +(addedOn.substr(8,2))
            let date = new Date(y, m-1, d)
            let options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}
            let day = (date.toLocaleDateString('en-us', options))


            console.log(x.data.likes);
            this.setState({
                title: x.data.title,
                body: x.data.body,
                addedOn: day,
                author: x.data.author,
                likes: x.data.likes,
                dislikes: x.data.dislikes
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            about: props.match.params.blogid,
            title: 'Loading.....',
            body: '',
            addedOn: '', 
            author: '', 
            likes: 0,
            dislikes: 0
        }
    }
    componentDidMount() {
        this.loadData()
        console.log(this.state.addedon);
    }
    render() {
        return (
            <>
                <Header />
                <div className="blogPage">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.addedOn}</p>
                    <p className="blogPageBody">{this.state.body}</p>
                </div>
                <div className="blogInfo">
                    <p>By: {this.state.author} <br/> {this.state.likes} <br/> {this.state.dislikes}</p>
                </div>
                <Footer />
            </>
        )
    }
}

export default Blog