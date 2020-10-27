import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import "./styles.css" ;

const arr = [] ;
arr.push('Interesting') ;
const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			arr.push(event.target.value);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>

			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="  	Press enter to add tags"
			/>
		</div>
	);
};
const InputSkill = () => {
    
    const selectedTags = tags => {
        console.log(tags);
    };
    return (
        <div className="allInIt">
            {/* {arr = tags} */}
		<div className="form">
			<TagsInput selectedTags={selectedTags}  tags={['Interesting'] }/>
		</div>
        </div>
	);
};

export default InputSkill ;
export {arr} ;
// ReactDOM.render(<App />, document.getElementById("root"));
