import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import axios from 'axios'

function Home(){
    let you_may_like
    axios.get('/you_may_like').then((x)=>{
        console.log(x.data);
        you_may_like = x
    })

    let trending_topics
    axios.get('/trending_topics').then((x)=>{
        console.log(x.data);
        you_may_like = x
    })

    let trending_posts
    axios.get('/trending_posts').then((x)=>{
        console.log(x.data);
        you_may_like = x
    })    

    let popular_autors
    axios.get('/popular_autors').then((x)=>{
        console.log(x.data);
        you_may_like = x
    })

    let all_posts
    axios.get('/all_posts').then((x)=>{
        console.log(x.data);
        all_posts = x
    })

    return(
        <div>
            <Header/>
            
            <div className="you_may_like">
                you_may_like
            </div>

            <div className="trending_topics">
                Trending topics
            </div>
            
            <div className="trending_posts">
                Trending posts
            </div>

            <div className="popular_autors">
                Popular Authors
            </div>

            <Footer/>
        </div>
    )
}

export default Home