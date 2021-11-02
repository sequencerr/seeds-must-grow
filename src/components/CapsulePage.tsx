import { Component } from 'react';
import { CapsulesService } from '../services/CapsulesService';
import { CapsuleInfoBlock } from '.';
import { RouteMatch } from '../types/types';

export const capsulesService = new CapsulesService();

export class CapsulePage extends Component {
	props!: {
		match: RouteMatch;
	};

	state: Capsule = {
		id: 0,
		name: '',
		slots_count: 0,
		power: 0,
		radiation: 0,
		temperature: 0,
		went_speed: 0
	};

	async setCapsuleData() {
		// Hook https://usehooks.com/useRouter/
		const { id } = this.props.match.params;
		const capsuleData = capsulesService.findCapsuleByID(id) ?? (await capsulesService.getCapsuleByID(id));

		if (this.state.id == capsuleData.id) return;

		this.setState(capsuleData);
	}

	componentDidUpdate = () => this.setCapsuleData();
	componentDidMount = () => this.setCapsuleData();

	render() {
		const { went_speed, name, power, radiation, slots_count, temperature } = this.state;

		return (
			<div id="Capsule">
				<span className="page__name">Capsule "{name}" info:</span>

				<div className="capsule__blocks">
					<CapsuleInfoBlock title="Ventilation Speed" value={went_speed} measure="rpm" />
					<CapsuleInfoBlock title="Power" value={power} measure="kW" />
					<CapsuleInfoBlock title="Radiation" value={radiation} measure="mSv" />
					<CapsuleInfoBlock title="Slots Count" value={slots_count} measure="" />
					<CapsuleInfoBlock title="Temperature" value={temperature} measure="°C" />
				</div>
			</div>
		);
	}
}
