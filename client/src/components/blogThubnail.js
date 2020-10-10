import React from 'react'

class Blog extends React.Component{
    render(){
        return(
            <div className='blogThumbnail' id={this.props.id}>
                this is a blog with blogid 
            </div>
        )
    }
}

export default Blog