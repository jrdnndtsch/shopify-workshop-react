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

	splitString(theString) {
		return theString.split(" ")
	}

	chunkArray(chunkSize, arr) {
        return [].concat.apply([],
            arr.map((elem,i) => {
                return i%chunkSize ? [] : [arr.slice(i,i+chunkSize)];
            })
        );
	}
	

	createLessonModules(moduleData){
		let allModules = moduleData.map(module => {
			let newString = this.stripHTML(module.content.subModuleContent.html)
			let splitContent = this.splitString(newString)
			splitContent = this.chunkArray(50, splitContent)
			splitContent = splitContent.map(item => {
				return {
					title: module.title,
					content: item.join(' '),
					module: module.content.belongsToModule.id
				}
			})
			return splitContent
		
		})
		let mergedMods = [].concat.apply([], allModules)
		console.log(mergedMods, 'merged')
		return mergedMods
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
		console.log(searchResults, 'raw search res')
		let processedRes = this.processSearchRes(searchResults)

		this.setState({
			searchRes: processedRes
		})



	}

	processSearchRes(results) {
		let searchRes = results.map(res => {
			return {
				title: res.item.title, 
				content: res.item.content, 
				module: res.item.module, 
				score: res.score, 
				matches: res.matches
			}
		})
		searchRes = searchRes.filter(res => {
			if(res.score < 0.5) {
				return res
			}
		})
		return searchRes
	}

	createSearchContentSnippet(searchRes) {
		searchRes.map(res => {

		})
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
		return <SearchModule theModule={module} key={i} />
	}

	render() {
		return (
			<div className="search-module">
				<div className="wrapper">
					{this.state.searchRes.map((module, i) =>
						this.renderSearchModules(module, i)
					)}
				</div>
			</div>
		)
	}
}
				