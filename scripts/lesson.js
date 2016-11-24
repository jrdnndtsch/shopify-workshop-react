var React = require('react');
var elemeno = require('elemeno');

import LessonModule from './lesson_module';

export default class Lesson extends React.Component {
	constructor(){
		super();

		this.state = {
			lessonModules: []
		} 

	}


	getLessonModules(theModule) {
		elemeno.setAPIKey('0743950e-a610-11e6-ae8a-6b76f37c54fe');
		let options = {
			filters: {
				'belongsToModule' : theModule
			}
		}
		let allModules = () => {
			return new Promise((resolve, reject) => {
				elemeno.getCollectionItems('sub-module', options, (err, response) => {
					if(response){
						resolve(response)
					}
				})
			})
		}

		allModules().then(res => {
			let mappedModules = this.createLessonModules(res.data)
			let theCourseModules = this.sortModules(mappedModules, 'order')
			this.setState({
				lessonModules: theCourseModules
			})
		})
	}

	createLessonModules(moduleData){
		let allModules = moduleData.map(module => {
			return {
				title: module.title,
				content: module.content.subModuleContent.html, 
				order: module.content.submoduleOrder.number, 
				module: module.content.belongsToModule.slug
			}
		})

		return allModules
	}

	sortModules(modules, key) {
		modules.sort((a, b) => {
			return a[key] - b[key]
		})
		return modules
	}

	


	renderLessonModules(module, i) {
		return <LessonModule theModule={module} key={i} />
	}

	componentDidMount() {
		this.getLessonModules(this.props.params.lessonId)
	}

	componentWillReceiveProps(newProps) {
		this.getLessonModules(newProps.params.lessonId)

	}

	render() {
		
		return (
			<div className="full-module">
				{this.state.lessonModules.map((module, i) =>
					this.renderLessonModules(module, i)
				)}
			</div>
		)
	}
}
				