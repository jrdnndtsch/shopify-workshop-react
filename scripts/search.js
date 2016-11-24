var React = require('react');
var elemeno = require('elemeno');
var Fuse = require('fuse.js');


import SearchModule from './search_module';

export default class Search extends React.Component {
	constructor(){
		super();
		this.state = {
			allModules: [], 
			searchRes: []
		}
	}

	stripHTML(content) {
		return content.replace(/<\/?[^>]+(>|$)/g, "")
	}

	createLessonModules(moduleData){
		let allModules = moduleData.map(module => {
			return {
				title: module.title,
				content: this.stripHTML(module.content.subModuleContent.html), 
				module: module.content.belongsToModule.id
			}
		})

		return allModules
	}


	performSearch(query) {

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

		let fuse = new Fuse(this.state.allModules, fuseOptions);
		let searchResults = fuse.search(query)

		console.log(searchResults, 'seach res')



	}

	componentDidMount(){
		elemeno.setAPIKey('0743950e-a610-11e6-ae8a-6b76f37c54fe');
		let allSubModules = () => {
			return new Promise((resolve, reject) => {
				elemeno.getCollectionItems('sub-module', (err, result) => {
					if(result) {
						resolve(result)
					}
				})
			})
		}

		allSubModules().then(res => {
			let allSubModules = this.createLessonModules(res.data)
			this.setState({
				allModules: allSubModules
			})
			this.performSearch(this.props.params.query)
		})
	}

	componentWillReceiveProps(newProps) {
		this.performSearch(newProps.params.query)
	}
	renderSearchModules(module, i) {
		return <SearchModule theModule={module} key={i} clickHandler={this.props.handleClick} />
	}
	render() {
		return (
			<div className="search-module">
				search
			</div>
		)
	}
}
				// {this.props.searchModules.map((module, i) =>
				// 	this.renderSearchModules(module, i)
				// )}