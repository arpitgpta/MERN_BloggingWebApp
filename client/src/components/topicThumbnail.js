import React from 'react'

function TopicThumbnail(props){
    return(
        <div className='topicThumbnail'>
            <span className='topicThumbnailHash'>#</span>
            <span className='topicThumbnailContent'>{props.topicName}</span>    
        </div>
    )
}

export default TopicThumbnail