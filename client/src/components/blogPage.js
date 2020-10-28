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
            author: '', 
            likes: 0,
            dislikes: 0
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

    componentDidMount() {
        this.loadData()
    }


    render() {
        return (
            <>
                <Header history={this.props.history}/> 
                                                           {/* we need to send history property so that we can 
                                                           redirect from chied compont too  else we can do this
                                                           from componts in direct child fo Router tag only*/}
                <div className="blogPage">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.addedOn}</p>
                    <p className="blogPageBody">{this.state.body}</p>
                </div>
                <div className="blogInfo">
                    <p>
                        By: {this.state.author} 
                        <br/> 
                        <ThumsUp/> {this.state.likes} 
                        <br/> 
                        <ThumsDown/> {this.state.dislikes}
                    </p>
                </div>
                <Footer />
            </>
        )
    }
}

export default Blog