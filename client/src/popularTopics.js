import React from 'react'
import TopicThumbnail from './components/topicThumbnail'


class PopularTopics extends React.Component {
    // console.log(topic)
    render() {
        let topic = []
        if(this.props.topics !== '.....loading')
        {
            topic = this.props.topics.topics
            topic = topic.map((i)=> <TopicThumbnail topicName={i} key={i}/>)
        }
        return(
            <div className='popularTopics'>
                <h1 className="popularTopicsHeading">Popular Topics</h1>
                <div className="popularTopicsContent">
                    {topic} 
                </div>
            </div>
        )
    }
}

export default PopularTopics