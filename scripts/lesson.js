var React = require('react');
var elemeno = require('elemeno');

import LessonModule from './lesson_module';

import Markdown from 'react-markdown';


// import createClient directly
import {createClient} from 'contentful'
const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'muc0p5m5ftil',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: '4d254b045c3568964632f1ef43a8708d502b62365df520070aec561ef23cc833'
})

export default class Lesson extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			lesson: {}
		} 

	}

	getLesson(lesson_id){
	  client.getEntry(lesson_id)
	  .then((lesson) => {
	   	this.setState({lesson: lesson.fields})
	  })

	}

	


	renderLessonModules(module, i) {
		return <LessonModule theModule={module} key={i} />
	}

	componentDidMount() {
		console.log(this.props.params.lessonId)
		this.getLesson(this.props.params.lessonId)
		
	}

	componentWillReceiveProps(newProps) {
		// this.getLessonModules(newProps.params.lessonId)
		this.getLesson(newProps.params.lessonId)

	}

	render() {
		const lesson = this.state.lesson
		return (
			<div className="full-module">
				<div className="wrapper lesson-module">
					<h2>{lesson.title}</h2>
					<Markdown 
					    escapeHtml={true}
					    source={lesson.content} 
					/>
					
				</div>
			</div>
		)
	}
}
				