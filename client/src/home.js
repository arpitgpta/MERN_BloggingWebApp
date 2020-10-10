import React from 'react'
import LandingHeader from './landingHeader'
import PopularTopics from './popularTopics'
import PopularBlogs from './popularBlogs'
import PopularAuthors from './popularAuthors'
import Footer from './components/footer'
import axios from 'axios'

class Home extends React.Component {
    loadData = () => {
        axios.get('/trendingTopics').then((x) => {
            this.setState({
                trendingTopics: x.data
            })
        })

        axios.get('/trendingBlogs').then((x) => {
            this.setState({
                trendingBlogs: x.data
            })
        })

        axios.get('/popularAuthors').then((x) => {
            this.setState({
                popularAuthors: x.data
            })
        })

        axios.get('/allPosts').then((x) => {
            this.setState({
                allPosts: x.data
            })
        })
    }

    constructor() {
        super()
        this.state = {
            youMayLike: ".....loading",
            trendingBlogs: ".....loading",
            popularAuthors: ".....loading",
            trendingTopics: ".....loading",
            allPosts: ".....loading",
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div className="landingPage">
                <LandingHeader/>
                <PopularTopics topics={this.state.trendingTopics}/>
                <PopularBlogs blogs={this.state.trendingBlogs}/>
                <PopularAuthors authors={this.state.popularAuthors}/>
                <Footer />
            </div>
        )
    }
}

export default Home