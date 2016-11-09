var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

export default class Post extends React.Component {
	constructor(){
		super();

	}
	render() {
		return (
			<article>
				<div key={this.props.i}>
					<h2>{this.props.post.title}</h2>
					<img src={this.props.post.content.featuredImage.imageUrl}/>
					<p>{this.props.post.content.storyDescription}</p>
				</div>
			</article>
		)
	}
}

