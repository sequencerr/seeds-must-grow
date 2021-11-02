import { Component, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { capsulesService, NavElem } from '.';
import CapsuleComponent from '../assets/capsule.svg';
import DashboardComponent from '../assets/dashboard.svg';
import NasaComponent from '../assets/NASA_logo.svg';

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
		this.setState({ capsules: await capsulesService.getCapsules() });
	}

	private visibilityHandler(
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
			<div id="Nav">
				<div className="nav__bar__section">
					<Link to="/" onClick={this.visibilityHandler('logo')}>
						<NasaComponent />
					</Link>
				</div>
				<div className="nav__bar__section">
					<NavElem
						lto="plants"
						innerText="Plants"
						svg={DashboardComponent}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
					<NavElem
						lto="capsules"
						innerText="Capsules"
						svg={CapsuleComponent}
						children={capsules}
						clickHandler={this.visibilityHandler}
						components={components}
					/>
				</div>
			</div>
		);
	}
}
