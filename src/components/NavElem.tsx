import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NavBar } from '.';
import { ComponentSVG } from '../types/types';

export class NavElem extends Component {
	props!: {
		innerText: string;
		svg: ComponentSVG;
		lto?: string; // link to *something*
		children?: { id: number; name: string }[];
		clickHandler: NavBar['visibilityHandler'];
		components: NavBar['state']['components'];
	};
	state: { isHidden: boolean } = {
		isHidden: true
	};
	path: string;

	constructor(props: NavElem['props']) {
		super(props);
		this.path = `/${this.props.lto ?? ''}`;
		this.updateIsHidden = this.updateIsHidden.bind(this);
	}

	componentDidMount() {
		const { path } = this;
		const { components } = this.props;

		if (path && window.location.href.endsWith(path)) {
			this.updateIsHidden();
			components[path] = this.updateIsHidden;
		}
	}

	private updateIsHidden(hide: boolean = false) {
		this.setState({ isHidden: hide });
	}

	render() {
		const { path } = this;
		const { innerText, svg: ComponentSVG, children, clickHandler } = this.props;
		const { isHidden } = this.state;

		const tree = isHidden ? null : (
			<div className="tree__child__container">
				{(children?.length ? children : []).map(e => (
					<NavLink
						key={e.id}
						to={`${this.path}/${e.id}`}
						className="child__elem"
						activeClassName="selected__child__elem"
					>
						{e.name}
					</NavLink>
				))}
			</div>
		);

		return (
			<div className="nav__elem" onClick={clickHandler?.call(undefined, path, this.updateIsHidden)}>
				<NavLink className="nav__link" activeClassName="selected__nav__link" to={path}>
					<ComponentSVG className="navImage" />
					<span className="navName">{innerText}</span>
				</NavLink>
				{tree}
			</div>
		);
	}
}
