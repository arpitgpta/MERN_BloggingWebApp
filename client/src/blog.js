import React from 'react'
import axios from 'axios'

import Header from './components/header'
import Footer from './components/footer'


class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            about: props.match.params.blogid
        }
    }
    render(){
        axios.get('/getBlog/'+this.state.about).then((x)=>{
            console.log(x.data);
        })
        return(
            <div>
                <Header/>
                this is a blog with blogid {this.state.about} 
                <Footer/>
            </div>
        )
    }
}

export default Blog