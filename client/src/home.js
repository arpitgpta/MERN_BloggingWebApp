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

    }

    constructor() {
        super()
        var demoBlog = {
            _id: '',
            title: 'loading....',
            author: 'loading....',
            authorId: '',
            body: 'loading....',
            likes: 0,
            dislikes: 0,
            addedOn: ''
        }
        this.state = {
            youMayLike: ".....loading",
            trendingBlogs: [demoBlog, demoBlog, demoBlog, demoBlog, demoBlog, demoBlog, demoBlog, demoBlog],
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
                <LandingHeader history={this.props.history}/>
                <PopularTopics topics={this.state.trendingTopics} history={this.props.history}/>
                <PopularBlogs blogs={this.state.trendingBlogs} history={this.props.history}/>
                <PopularAuthors authors={this.state.popularAuthors} history={this.props.history}/>
                <Footer />
            </div>
        )
    }
}

export default Home