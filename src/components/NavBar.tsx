import { Component } from 'react';
import { Link } from 'react-router-dom';
import { capsuleService, NavElem } from '.';
import bell from '../assets/bell.svg';
import capsule from '../assets/capsule.svg';
import config from '../assets/config.svg';
import dashboard from '../assets/dashboard.svg';
import nasa from '../assets/NASA_logo.svg';
import list from '../assets/task_list.svg';
import textbox from '../assets/textbox.svg';

export class NavBar extends Component {
	state: { capsules: Capsule[] } = { capsules: [] };

	async componentDidMount() {
		this.setState({ capsules: await capsuleService.getCapsules() });
	}

	render() {
		const { capsules } = this.state;

		return (
			<div className="nav__bar">
				<div className="nav__bar__section">
					<Link to="/">
						<img src={nasa} alt="NASA_logo" />
					</Link>
				</div>
				<div className="nav__bar__section">
					<NavElem lto="plants" innerText="Plants" svg={dashboard} />
					<NavElem lto="capsules" innerText="Capsules" svg={capsule} children={capsules} />
					<NavElem lto="tasks" innerText="My Tasks" svg={list} />
					<NavElem lto="messages" innerText="Messages" svg={textbox} />
				</div>
				<div className="nav__bar__section">
					<span className="nav__category__label">Settings</span>
					<NavElem lto="settings" innerText="Main Settings" svg={config} />
					<NavElem lto="call_center" innerText="Call center" svg={bell} />
				</div>
			</div>
		);
	}
}
