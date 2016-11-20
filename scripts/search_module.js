var React = require('react');

export default class SearchModule extends React.Component {
	constructor(){
		super();

		this.state = {
			term: '',
			resModules: []
		}

	}
	render() {
		return (
			<div>
				<p>search res</p>
			</div>
		)
	}
}