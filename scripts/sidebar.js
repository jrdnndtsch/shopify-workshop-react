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
				<form className="searchBar">
					<label htmlFor="search">Search</label>
					<input type="text" id="search" name="search" onChange={this.handleSearch.bind(this)} />
					<Link to={`search/${this.state.searchTerm}`}>Search</Link>
				</form>
				<ul>
					{this.props.sidebarModules.map((module, i) => {
						
						return (
							<Link to={`lesson/${module.id}`} key={i} >
								<SidebarModule module={module} active={module.active} key={i} />
							</Link>
						)		
					})}	
				</ul>
			</nav>
		)
	}
}