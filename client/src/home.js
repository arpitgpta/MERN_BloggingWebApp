import React from 'react'
import Header from './components/header'
import Footer from './components/footer'

function Home(){
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