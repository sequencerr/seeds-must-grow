import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NavBar } from '.';

export class NavElem extends Component {
	props!: {
		innerText: string;
		svg: string;
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
		this.updateIsHidden=this.updateIsHidden.bind(this)
	}

	componentDidMount() {
		const { path } = this;
		const { components } = this.props;

		if (path && window.location.href.endsWith(path)) {
			this.updateIsHidden();
			components[path] = this.updateIsHidden;
		}
	}

	updateIsHidden(hide: boolean = false) {
		this.setState({ isHidden: hide });
	}

	render() {
		const { path } = this;
		const { innerText, svg, children, clickHandler } = this.props;
		const { isHidden } = this.state;

		const tree = (
			<div>
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
					<img className="navImage" src={svg} alt={`${innerText}-svg`} />
					<span className="navName">{innerText}</span>
				</NavLink>
				{isHidden ? <></> : tree}
			</div>
		);
	}
}
