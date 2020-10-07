import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import axios from 'axios'

class Home extends React.Component {
    loadData = () => {
        axios.get('/youMayLike').then((x) => {
            console.log(x.data);
            this.setState({
                youMayLike: x.data
            })
        })

        axios.get('/trendingTopics').then((x) => {
            console.log(x.data);
            this.setState({
                trendingTopics: x.data
            })
        })

        axios.get('/trendingPosts').then((x) => {
            this.setState({
                trendingPosts: x.data
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
            trendingPosts: ".....loading",
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
                <img className="firstSection" src="/images/firstSection_bg.jpg"/>
                <div >
                    
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home