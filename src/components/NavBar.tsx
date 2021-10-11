import { Component, MouseEventHandler } from 'react';
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
	state: {
		capsules: Capsule[];
		enabledComponent: string;
		components: Record<string, NavElem['updateIsHidden']>;
	} = {
		capsules: [],
		components: {},
		enabledComponent: ''
	};

	constructor(props: NavBar['props']) {
		super(props);
		this.visibilityHandler = this.visibilityHandler.bind(this);
	}

	async componentDidMount() {
		this.setState({ capsules: await capsuleService.getCapsules() });
	}

	visibilityHandler(
		id: NonNullable<NavElem['props']['lto']>,
		updateIsHidden?: () => void
	): MouseEventHandler<HTMLElement> {
		return () => {
			const { enabledComponent, components } = this.state;
			if (enabledComponent == id) return;

			if (updateIsHidden) {
				if (!Object.keys(components).includes(id)) {
					components[id] = updateIsHidden;
				}

				components[id]();
			}

			for (const k in components) {
				if (k != id) components[k](true);
			}

			this.setState({ enabledComponent: id });
		};
	}

	render() {
		const { capsules, components } = this.state;

		return (
			<div className="nav__bar">
				<div className="nav__bar__section">
					<Link to="/" onClick={this.visibilityHandler('logo')}>
						<img src={nasa} alt="NASA_logo" />
					</Link>
				</div>
				<div className="nav__bar__section">
					<NavElem
						lto="plants"
						innerText="Plants"
						svg={dashboard}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
					<NavElem
						lto="capsules"
						innerText="Capsules"
						svg={capsule}
						children={capsules}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
					<NavElem
						lto="tasks"
						innerText="My Tasks"
						svg={list}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
					<NavElem
						lto="messages"
						innerText="Messages"
						svg={textbox}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
				</div>
				<div className="nav__bar__section">
					<span className="nav__category__label">Settings</span>
					<NavElem
						lto="settings"
						innerText="Main Settings"
						svg={config}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
					<NavElem
						lto="call_center"
						innerText="Call center"
						svg={bell}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
				</div>
			</div>
		);
	}
}
