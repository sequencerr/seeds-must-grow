import { Component } from 'react';
import { CapsuleElem } from '.';
import { CapsulesService } from '../services';

export const capsuleService = new CapsulesService();

export class CapsulesPage extends Component {
	state: { capsules: Capsule[] } = { capsules: [] };

	async componentDidMount() {
		this.setState({ capsules: await capsuleService.getCapsules() });
	}

	render() {
		return this.state.capsules.map(c => <CapsuleElem data={c} key={c.id}></CapsuleElem>);
	}
}
