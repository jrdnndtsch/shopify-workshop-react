var React = require('react');
import { BrowserRouter, Match, Miss, Link } from 'react-router';
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
			<div className="search-module">
				<Link to={`lesson/${this.props.theModule.module}`}>
					<div>
						<h3>{this.props.theModule.title}</h3>
						{this.props.theModule.matchedKey.includes('content') ? <p>{this.props.theModule.content}</p> : null}
					</div>
				</Link>	
			</div>
		)
	}
}
				
				