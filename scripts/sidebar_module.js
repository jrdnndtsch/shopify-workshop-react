var React = require('react');

export default class SidebarModule extends React.Component {
	constructor(){
		super();

	}


	render() {
		return (
			<li className={"sidebarItem " + (this.props.active ? 'active' : 'off')} onClick={this.props.handleClick}>
				<span>{this.props.module.order}</span>
				<p>{this.props.module.title}</p>
			</li>
		)
	}
}