import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavElem } from '.';
import bell from '../assets/bell.svg';
import capsule from '../assets/capsule.svg';
import config from '../assets/config.svg';
import dashboard from '../assets/dashboard.svg';
import nasa from '../assets/NASA_logo.svg';
import list from '../assets/task_list.svg';
import textbox from '../assets/textbox.svg';

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
					<NavElem lto="tasks" innerText="My Tasks" svg={list}></NavElem>
					<NavElem lto="messages" innerText="Messages" svg={textbox}></NavElem>
				</div>
				<div>
					<NavElem lto="settings" innerText="Main Settings" svg={config}></NavElem>
					<NavElem lto="call_center" innerText="Call center" svg={bell}></NavElem>
				</div>
			</div>
		);
	}
}
