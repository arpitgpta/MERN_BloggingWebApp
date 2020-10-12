import React from 'react'
import axios from 'axios'

import Header from './header'
import Footer from './footer'


class Blog extends React.Component {

    loadData = () => {
        axios.get('/getBlog/' + this.state.about).then((x) => {
            console.log(x.data);
            this.setState({
                title: x.data.title,
                body: x.data.body
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            about: props.match.params.blogid,
            title: 'Loading.....',
            body: ''
        }
    }
    componentDidMount() {
        this.loadData()
    }
    render() {
        return (
            <>
                <div className="blogPageData">
                    <Header />
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <Footer />
                </div>

                <div className="blogPageAuthorInfo">
                    
                </div>

            </>
        )
    }
}

export default Blog