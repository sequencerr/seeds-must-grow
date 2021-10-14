import { Component } from 'react';
import { plantsService } from '.';
import svg from '../assets/bell.svg';
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
			<div className="plant__elem">
				<span>Plant info:</span>
				<span>Description: {description}</span>
				<span>Name: {name}</span>
				<div></div>
				<img src={svg} alt="" />
			</div>
		);
	}
}
