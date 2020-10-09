import React from 'react'
import LandingHeader from './landingHeader'
import Footer from './components/footer'
import axios from 'axios'

class Home extends React.Component {
    loadData = () => {
        axios.get('/youMayLike').then((x) => {
            console.log(x.data);
            this.setState({
                youMayLike: x.dataLandingHeader
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
                <LandingHeader/>
                <br/>
                <h1>sdfffffff1</h1>
                <h1>sdfffffff2</h1>
                <h1>sdfffffff3</h1>
                <h1>sdfffffff4</h1>
                <h1>sdfffffff5</h1>
                <h1>sdfffffff6</h1>
                <h1>sdfffffff7</h1>
                <h1>sdfffffff8</h1>
                <h1>sdfffffff9</h1>
                <h1>sdfffffff10</h1>
                <h1>sdfffffff11</h1>
                <h1>sdfffffff12</h1>
                <h1>sdfffffff13</h1>
                <h1>sdfffffff14</h1>
                <Footer />
            </div>
        )
    }
}

export default Home