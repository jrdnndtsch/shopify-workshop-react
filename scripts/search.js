var React = require('react');


import SearchModule from './search_module';

export default class Lesson extends React.Component {
	constructor(){
		super();

	}
	renderSearchModules(module, i) {
		return <SearchModule theModule={module} key={i} clickHandler={this.props.handleClick} />
	}
	render() {
		return (
			<div className="search-module">
				{this.props.searchModules.map((module, i) =>
					this.renderSearchModules(module, i)
				)}
			</div>
		)
	}
}