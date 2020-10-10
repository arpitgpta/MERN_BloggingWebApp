import React from 'react'
import TopicThumbnail from './components/topicThumbnail'


class PopularTopics extends React.Component {
    // console.log(topic)
    render() {
        let topic = []
        if(this.props.topics === '.....loading')
        {
            console.log('still loading');
        }
        else
        {
            topic = this.props.topics.topics
            console.log(topic[0]);
            topic = topic.map((i)=> <TopicThumbnail topicName={i}/>)
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