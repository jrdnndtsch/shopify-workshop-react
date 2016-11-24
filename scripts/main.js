var React = require('react');
var ReactDOM = require('react-dom');
var Fuse = require('fuse.js');
var elemeno = require('elemeno');

import { Router, Route, Link, Navigation, hashHistory, IndexRoute } from 'react-router';
import Sidebar from './sidebar';
import SidebarModule from './sidebar_module';
import LessonModule from './lesson_module';
import Lesson from './lesson';
import Search from './search';
import SearchModule from './search_module';






class App extends React.Component {
	constructor() {
		super();
		this.state = {
			sidebarModules: [],
			activeSidebarModule: '', 
			searchTerm: ''
		}
		
	}


	//=============== HELPER METHODS ===============

	//sort modules based on provided order value
	sortModules(modules, key) {
		modules.sort((a, b) => {
			return a[key] - b[key]
		})
		return modules
	}


	

	//=============== CREATE METHODS ===============

	createSidebar(res) {
		let mappedSidebarModules = res.map(module => {
			return {
				title: module.title, 
				order: module.content.moduleOrder.number, 
				slug: module.slug,
				active: false, 
				id: module.id
			}
		})
		
		// sort all course modules by order key
		let sidebarModules = this.sortModules(mappedSidebarModules, 'order')

		return sidebarModules
	}

	setActiveSidebar(lessonId, sidebarModules) {
		// set the active sidebar module to the lessonId from the params defined by the route
		let activeSidebarModule = ''
		lessonId ? 	activeSidebarModule = lessonId : activeSidebarModule = ''
		

		// set the activeSidebarModule course module to active
		sidebarModules.forEach((module) => {
			module.id == activeSidebarModule ? module.active = true : module.active = false
		})

		return activeSidebarModule
	}

	//=============== GET DATA METHODS ===============
	
	getModules(lessonId) {
		
		elemeno.setAPIKey('0743950e-a610-11e6-ae8a-6b76f37c54fe');
		
		let sidebarModules = () => {
			return new Promise((resolve, reject) => {
				elemeno.getCollectionItems('course-modules', (err, result) => {
					if(result) {
						resolve(result)
					}
				})
			})
		}

		sidebarModules()
			.then(res => {

				//create sidebar components
				let sidebarModules = this.createSidebar(res.data)

				//set the active component to active
				let activeSidebarModule = this.setActiveSidebar(this.props.params.lessonId, sidebarModules)

				this.setState({
					sidebarModules: sidebarModules,
					activeSidebarModule: activeSidebarModule
				})
			})
	
	}





	

	componentDidMount(){
		this.getModules()

	}

	componentWillReceiveProps(newProps) {
		let activeSidebarModule = this.setActiveSidebar(newProps.params.lessonId, this.state.sidebarModules)
		this.setState({
			activeSidebarModule: activeSidebarModule
		})
	}

	//=============== EVENT METHODS ===============


	handleSearch(e) {
		this.setState({
			searchTerm: e.target.value
		})
	}

	// performSearch() {
	// 	let searchVal = this.state.searchTerm
	// 	let stripedModules = this.state.allModules.map(module => {
	// 		return {
	// 			module: module.module, 
	// 			title: module.title, 
	// 			content: this.stripHTML(module.content)
	// 		}
	// 	})
	

	// 	let fuseOptions = {
	// 		shouldSort: true, 
 //  			threshold: 0.6,
 //  			distance: 5000,
	// 		keys: [
	// 			'title', 
	// 			'content'
	// 		], 
	// 		include: [
	// 			'score', 
	// 			'matches' 
	// 		]

	// 	}

	// 	let fuse = new Fuse(stripedModules, fuseOptions);
	// 	let searchResults = fuse.search(searchVal)
	// 	searchResults = searchResults.map(res => {
	// 		return {
	// 			module: res.item.module, 
	// 			title: res.item.title
	// 		}
	// 	})

	// 	console.log(searchResults)

	// 	this.setState({
	// 		isSearch: true, 
	// 		searchResults: searchResults
	// 	})


	// }

	
	//TODO - on click of search results change is search to false and render that module
	//TODO - preview of content for searhc res
	//TODO - limit search res to things below 0.6
	//TODO is there a better way that cloning and setting the app state to global state when rendering children

	render() {
		return (
		
			<main className="flex-container">
				<Sidebar sidebarModules={this.state.sidebarModules} searchTerm={this.state.searchTerm} />
				<div className="content">
					{this.props.children}
					
				</div>
			</main>
			
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

const Home = () => {
	return (
		<div>
			<h1>Hi</h1>
		</div>
	)
}

const Root = () => {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="lesson/:lessonId" component={Lesson} />
				<Route path="search/:query" component={Search} />
			</Route>
		</Router>
	)
}
ReactDOM.render(
	<Root/>,
	 document.getElementById('main')
)





