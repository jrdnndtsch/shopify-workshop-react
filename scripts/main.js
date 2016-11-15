var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');
var fetch = require('node-fetch');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var Navigation = ReactRouter.Navigation;
// var History = ReactRouter.History
// var createBrowserHistory = require('history/lib/createBrowserHistory');
var h = require('./helpers');

import { BrowserRouter, Match, Miss, Link } from 'react-router';



import SidebarModule from './sidebar_module';
import LessonModule from './lesson_module';
import Lesson from './lesson';




class App extends React.Component {
	constructor() {
		super();
		this.state = {
			courseModules: [],
			currentModule: [], 
			activeModule: '', 
			allModules: []
		}
		
	}
	//sort modules based on provided order value
	sortModules(modules, key) {
		modules.sort((a, b) => {
			return a[key] - b[key]
		})
		return modules
	}

	//filter sub-modules based on the module that is selected in the sidebar
	filterAllModules(modules, activeModule){
		let currentModule = modules.filter(module => {
			if(module.module == activeModule){
				return module
			}
		})

		if(currentModule){
			return currentModule = this.sortModules(currentModule, 'order')
		} else {
			return currentModule = []
		}
		
	}

	getPromiseData(promiseArray) {
		return new Promise((resolve, reject) => {
			Promise.all(promiseArray)
				.then(res => {
					return res.map(module => module.json() )
				})
				.then(res => {
					Promise.all(res)
						.then(resolve)
				})
				.catch(console.log(reject));
		})
	}
	
	getModules(lessonId) {
		// all initial calls made to API for setup
		let fetchCalls = ['collections/course-modules/items', 'collections/sub-module/items'];

		// init for fetch call
		let fetchOptions = {
			method: 'GET',
			headers: {
			  'Authorization': '0743950e-a610-11e6-ae8a-6b76f37c54fe'
			}
		}

		// all the fetch call
		let moduleCalls = fetchCalls.map(slug => {
			return fetch(`http://api.elemeno.io/v1/${slug}`, fetchOptions)
		});

		// get data from array of promises
		
		this.getPromiseData(moduleCalls)
			.then(result => {
				let mappedSidebarModules = result[0].data.map(module => {
					return {
						title: module.title, 
						order: module.content.moduleOrder.number, 
						slug: module.slug,
						active: false
					}
				})
				
				// sort all course modules by order key
				let courseModules = this.sortModules(mappedSidebarModules, 'order')

				// set the active sidebar module to the lessonId from the params defined by the route
				let activeSidebarModule = ''
				lessonId ? 	activeSidebarModule = lessonId : activeSidebarModule = courseModules[0].slug
		

				// set the activeSidebarModule course module to active
				courseModules.forEach((module) => {
					module.slug == activeSidebarModule ? module.active = true : module.active = false
				})


				//map data for all sub-modules 
				let allModules = result[1].data.map(module => {
					return {
						title: module.title,
						content: module.content.subModuleContent.html, 
						order: module.content.submoduleOrder.number, 
						module: module.content.belongsToModule.slug
					}
				})

				//filter all sub-module data and only return sub-modules that are part of active module
				let currentModule = this.filterAllModules(allModules, activeSidebarModule)
				
				// update state with active module, correspoding sub-modules, and all sidebar module and sub-module data
				this.setState({
					courseModules: courseModules,
					currentModule: currentModule, 
					activeModule: activeSidebarModule, 
					allModules: allModules
				})

			})
	
	}





	

	componentDidMount(){
		this.getModules(this.props.params.lessonId)
		console.log(this.props.params.lessonId)

	}

	handleClick(module) {
		// filter all sub-modules and return only those belonging to the module passed in
		let currentModule = this.filterAllModules(this.state.allModules, module)

		// update sidebar modules so new one is active
		let courseModules = this.state.courseModules.map((courseModule) => {
			courseModule.slug == module ? courseModule.active = true : courseModule.active = false
			return courseModule
		})
	
		// update state
		this.setState({
			activeModule: module, 
			currentModule: currentModule, 
			courseModules: courseModules
		})
	}



	render() {
		return (
			<BrowserRouter>
			<main className="flex-container">
				<nav className="sidebar">
					<ul>
					{this.state.courseModules.map((module, i) => {
						
						return (
							<Link to={module.slug} key={i} >
							<SidebarModule module={module} active={module.active} key={i} handleClick={this.handleClick.bind(this, module.slug)}  params={{lessonId: module.slug}}/>
							</Link>
						)		
					})}	
					</ul>
				</nav>
				<div className="content">
					<Lesson currentModule={this.state.currentModule} lessonId={this.state.activeSidebarModule} />
				</div>
			</main>
			</BrowserRouter>
		)
		
	}
}


class NotFound extends React.Component {
  render() {
    return (
      <h2>404</h2>
    )
  }
}		


const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={App} />
				<Match exactly pattern="/:lessonId" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}
ReactDOM.render(
	<Root/>,
	 document.getElementById('main')
)







