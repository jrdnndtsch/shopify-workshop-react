var React = require('react');

import LessonModule from './lesson_module';

export default class Lesson extends React.Component {
	constructor(){
		super();

	}
	renderLessonModules(module, i) {
		return <LessonModule theModule={module} key={i} />
	}
	render() {
		return (
			<div className="full-module">
				{this.props.currentModule.map((module, i) =>
					this.renderLessonModules(module, i)
				)}
			</div>
		)
	}
}