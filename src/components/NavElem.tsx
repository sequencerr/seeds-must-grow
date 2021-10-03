import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class NavElem extends Component {
	props!: {
		innerText: string;
		svg: string;
		lto?: string; // link to *something*
	};

	render() {
		const { innerText, svg, lto } = this.props;
		const path = `/${lto ?? ''}`;

		return (
			<NavLink className="link" activeClassName="selected__nav__elem" to={path}>
				<img className="navImage" src={svg} alt={`${innerText}-svg`} />
				<span className="navName">{innerText}</span>
			</NavLink>
		);
	}
}
