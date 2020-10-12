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

        axios.get('/allBlogs').then((x) => {
            // this.setState({
            //     allPosts: x.data
            // })
            // console.log(x);
        })
    }

    constructor() {
        super()
        var demoBlog = {
            _id : '',
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
            trendingBlogs: [demoBlog,demoBlog,demoBlog,demoBlog,demoBlog,demoBlog,demoBlog,demoBlog],
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