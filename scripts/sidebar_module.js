var React = require('react');

export default class SidebarModule extends React.Component {
	constructor(){
		super();

		this.state = {
			active: false
		}

	}

	componentDidMount(){
		let slug = this.props.module.slug
		// this.setState({
		// 	active: this.props.active
		// })
	}
	


	render() {
		return (
			<li className={"sidebarItem " + (this.props.active ? 'active' : 'off')} onClick={this.props.handleClick}>
				<span>{this.props.module.order}</span>
				<a href="#">{this.props.module.title}</a>
			</li>
		)
	}
}