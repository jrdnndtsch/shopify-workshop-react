var React = require('react');
var elemeno = require('elemeno');
var Fuse = require('fuse.js');

import { Link } from 'react-router';
import SidebarModule from './sidebar_module';

export default class Sidebar extends React.Component {
	constructor() {
		super();
		this.state = {
			searchTerm: '', 
			allModules: []		
		}
	}

	handleSearch(e) {
		this.setState({
			searchTerm: e.target.value
		})
	}

	

	componentDidMount() {
		
	}

	render() {
		return(
			<nav className="sidebar">
				<h1>{this.props.workshop}</h1>
				<ul>
					{this.props.lessons.map((lesson, i) => {
						return (
							<Link to={`lesson/${lesson.lesson_id}`} key={i} >
								<SidebarModule module={lesson} active={this.props.activeLesson === lesson.lesson_id} key={lesson.lesson_id} />
							</Link>
						)		
					})}	
				</ul>
			</nav>
		)
	}
}

	// <div className="search-box">
				// 	<input type="text" id="search" name="search" placeholder="what are you looking for" onChange={this.handleSearch.bind(this)} />
				// 	<Link to={`search/${this.state.searchTerm}`}>Search</Link>
				// </div>