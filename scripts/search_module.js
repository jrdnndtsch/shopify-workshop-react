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
			<div>
				<Link to={this.props.theModule.module}>
					<div>
						<h3>{this.props.theModule.title}</h3>
						<p>{this.props.theModule.module}</p>
					</div>
				</Link>	
			</div>
		)
	}
}
				
				