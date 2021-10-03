import { Component } from 'react';
import { plantsService } from '.';

export class PlantElem extends Component {
	props!: {
		data: Plant;
	};

	state: PlantType = {
		id: 0,
		name: 'Loading...',
		description: 'Loading...'
	};

	async componentDidMount() {
		this.setState(await plantsService.getPlantTypeByID(this.props.data.plant_type));
	}

	render() {
		const { description, name } = this.state;

		return (
			<div>
				<span>Plant info:</span>
				<span>Description: {description}</span>
				<span>Name: {name}</span>
			</div>
		);
	}
}
