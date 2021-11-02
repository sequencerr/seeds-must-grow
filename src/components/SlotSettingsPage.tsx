import { Component, MouseEvent } from 'react';
import { plantsService, slotsService } from '../services';
import { RouteMatch, TargetType } from '../types/types';

export class SlotSettingsPage extends Component {
	props!: {
		match: RouteMatch;
	};
	state: SlotWithParsedPlant = {
		capsule: 0,
		id: 0,
		name: 'Loading...',
		plant: null,
		radiation: 0
	};

	async componentDidMount() {
		const { slot_id } = this.props.match.params;

		const slot = await slotsService.getSlotByID(slot_id);

		if (!slot.plant) return this.setState(slot);

		(slot as SlotWithParsedPlant).plant = await plantsService.getPlantTypeByID(slot.plant);
		this.setState(slot);
	}

	handleClick(event: MouseEvent<HTMLInputElement>) {
		const { checked } = event.target as typeof event.target & {
			type: TargetType;
			checked: boolean;
			value: string;
		};

		slotsService.updateRule(this.state.id, checked);
	}

	render() {
		const { plant } = this.state;
		if (!plant) return null;

		const { name } = plant;

		return (
			<div id="SlotSettingsPage">
				<span className="page__name">Slot settings ({name})</span>
				<span>Set Settings</span>
				<span>Push Water</span>
				<input type="checkbox" name="Push Water" id="1" onClick={this.handleClick.bind(this)} />
			</div>
		);
	}
}
