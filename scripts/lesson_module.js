var React = require('react');

export default class LessonModule extends React.Component {
	constructor(){
		super();

	}
	render() {
		return (
			<div className="wrapper">
				<h2>{this.props.theModule.order} {this.props.theModule.title}</h2>
				<div dangerouslySetInnerHTML={{__html: this.props.theModule.content}}/>
			</div>
		)
	}
}