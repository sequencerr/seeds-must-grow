import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavElem } from '.';
import capsule from '../assets/capsule.svg';
import dashboard from '../assets/dashboard.svg';
import nasa from '../assets/NASA_logo.svg';

export class NavBar extends Component {
	render() {
		return (
			<div className="nav__bar">
				<div>
					<Link to="/">
						<img src={nasa} alt="NASA_logo" />
					</Link>
				</div>
				<div>
					<NavElem lto="plants" innerText="Plants" svg={dashboard}></NavElem>
					<NavElem lto="capsules" innerText="Capsules" svg={capsule}></NavElem>
				</div>
			</div>
		);
	}
}
