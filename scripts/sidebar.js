var React = require('react');
var elemeno = require('elemeno');

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

	stripHTML(content) {
		return content.replace(/<\/?[^>]+(>|$)/g, "")
	}

	handleSearch(e) {
		this.setState({
			searchTerm: e.target.value
		})
	}

	performSearch() {
		elemeno.setAPIKey('0743950e-a610-11e6-ae8a-6b76f37c54fe');
		let searchVal = this.state.searchTerm
		let stripedModules = this.state.allModules.map(module => {
			return {
				module: module.module, 
				title: module.title, 
				content: this.stripHTML(module.content)
			}
		})
	

		let fuseOptions = {
			shouldSort: true, 
  			threshold: 0.6,
  			distance: 5000,
			keys: [
				'title', 
				'content'
			], 
			include: [
				'score', 
				'matches' 
			]

		}

		let fuse = new Fuse(stripedModules, fuseOptions);
		let searchResults = fuse.search(searchVal)
		searchResults = searchResults.map(res => {
			return {
				module: res.item.module, 
				title: res.item.title
			}
		})

		console.log(searchResults)

		this.setState({
			isSearch: true, 
			searchResults: searchResults
		})


	}

	render() {
		return(
			<nav className="sidebar">
				<form className="searchBar">
					<label htmlFor="search">Search</label>
					<input type="text" id="search" name="search" onChange={this.handleSearch} />
					<input type="submit" value="search" onClick={this.performSearch} />
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