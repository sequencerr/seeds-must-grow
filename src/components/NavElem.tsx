import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class NavElem extends Component {
	props!: {
		innerText: string;
		svg: string;
		lto?: string; // link to *something*
		children?: { id: number; name: string }[];
	};

	state: { isItemsVisible: boolean } = {
		isItemsVisible: false
	};

	render() {
		const { innerText, svg, lto, children } = this.props;
		const { isItemsVisible } = this.state;
		const path = `/${lto ?? ''}`;

		return (
			<div className="nav__elem">
				<NavLink className="nav__link" activeClassName="selected__nav__link" to={path}>
					<img className="navImage" src={svg} alt={`${innerText}-svg`} />
					<span className="navName">{innerText}</span>
				</NavLink>
				<div>
					{
						/* children?.length && */

						(children?.length ? children : []).map(e => (
							<NavLink
								key={e.id}
								to={`${path}/${e.id}`}
								hidden={isItemsVisible}
								className="child__elem"
								activeClassName="selected__child__elem"
							>
								{e.name}
							</NavLink>
						))
					}
				</div>
			</div>
		);
	}
}
