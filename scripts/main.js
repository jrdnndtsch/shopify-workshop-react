var React = require('react');
var ReactDOM = require('react-dom');
var Fuse = require('fuse.js');


import { Router, Route, Link, Navigation, hashHistory, IndexRoute } from 'react-router';
import Sidebar from './sidebar';
import SidebarModule from './sidebar_module';
import LessonModule from './lesson_module';
import Lesson from './lesson';
import Search from './search';
import SearchModule from './search_module';

// import createClient directly
import {createClient} from 'contentful'
const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'muc0p5m5ftil',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: '4d254b045c3568964632f1ef43a8708d502b62365df520070aec561ef23cc833'
})





class App extends React.Component {
	constructor() {
		super();
		this.state = {
			sideBarContent: [],
			activeSidebarModule: '', 
			searchTerm: ''
		}

		this.getWorkshop = this.getWorkshop.bind(this)
		// this.handleSideBarClick = this.handleSideBarClick.bind(this)
		// this.buildSideBarTitles = this.buildSideBarTitles.bind(this)
		
	}

	//=============== CONTENTFUL DATA FETCH ===============
	getWorkshop(){
		// specify the workshop you want using the entry id from contentful (get this by making a call to all workshops and then retrieve the workshop entry id)
	  client.getEntries({
	  	content_type:'workshop'
	  })
	  .then((workshops) => {
	   	const workshop = workshops.items.filter(workshop => {
	    	return workshop.sys.id == '1YSAuHIhbeo6M42QEWAM4c'
	    })[0]
	    
	    this.setState({
	    	workshopTitle: workshop.fields.title, 
	    	lessons: workshop.fields.lesson, 
	    	sideBarContent: this.buildSideBarTitles(workshop.fields.lesson)
	    })
	  })

	}


	buildSideBarTitles(lessons) {
		const sideBarData = lessons.map((lesson) => {
			return {order: lesson.fields.order, title: lesson.fields.title, lesson_id: lesson.sys.id}
		})
		return sideBarData;
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
	
	// getModules(lessonId) {
		
	// 	elemeno.setAPIKey('0743950e-a610-11e6-ae8a-6b76f37c54fe');
		
	// 	let sidebarModules = () => {
	// 		return new Promise((resolve, reject) => {
	// 			elemeno.getCollectionItems('course-modules', (err, result) => {
	// 				if(result) {
	// 					resolve(result)
	// 				}
	// 			})
	// 		})
	// 	}

	// 	sidebarModules()
	// 		.then(res => {

	// 			//create sidebar components
	// 			let sidebarModules = this.createSidebar(res.data)

	// 			//set the active component to active
	// 			let activeSidebarModule = this.setActiveSidebar(this.props.params.lessonId, sidebarModules)

	// 			this.setState({
	// 				sidebarModules: sidebarModules,
	// 				activeSidebarModule: activeSidebarModule
	// 			})
	// 		})
	
	// }





	

	componentDidMount(){
		this.getWorkshop()
		this.setState({
			activeLesson: this.props.params.lessonId || ''
		})
	}

	componentWillReceiveProps(newProps) {
		console.log('new props?', newProps)
		this.setState({
			activeLesson: this.props.params.lessonId
		})
	}

	//=============== EVENT METHODS ===============


	handleSearch(e) {
		this.setState({
			searchTerm: e.target.value
		})
	}


	render() {
		return (
		
			<main className="flex-container">
				<Sidebar lessons={this.state.sideBarContent} activeLesson={this.state.activeLesson} searchTerm={this.state.searchTerm} workshop={this.state.workshopTitle}/>
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
			<h1>👋 and Welcome</h1>
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

				// <Route path="lesson/:lessonId" render={(routeProps) => (<Lesson {...routeProps} lessons={this.state.lessons}/>)} />

ReactDOM.render(
	<Root/>,
	 document.getElementById('main')
)





