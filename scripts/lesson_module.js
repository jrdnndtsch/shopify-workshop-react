var React = require('react');

export default class LessonModule extends React.Component {
	constructor(){
		super();

	}
	render() {
		return (
			<div className="wrapper lesson-module">
				<h2><span>{this.props.theModule.order}</span> {this.props.theModule.title}</h2>
				<div dangerouslySetInnerHTML={{__html: this.props.theModule.content}}/>
			</div>
		)
	}
}