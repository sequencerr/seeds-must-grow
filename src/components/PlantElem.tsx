import { Component } from 'react';
import { Link } from 'react-router-dom';
import { plantsService, slotsService } from '../services';

export class PlantElem extends Component {
	props!: {
		data: Plant;
	};

	state: {
		plantSlot: Slot;
		plant: PlantType;
	} = {
		plantSlot: {
			id: 0,
			name: 'Loading...',
			radiation: 0,
			capsule: 0,
			plant: null
		},
		plant: {
			id: 0,
			name: 'Loading...',
			description: 'Loading...'
		}
	};

	async componentDidMount() {
		const { id } = this.props.data.plant_type;

		this.setState({
			plant: await plantsService.getPlantTypeByID(id)
		});
		this.setState({
			plantSlot: await slotsService.getSlotByPlantID(id)
		});
	}

	render() {
		const { id: slotID } = this.state.plantSlot;
		const { name, image, id } = this.state.plant;

		if (!id) return null;

		const imageElement = image ? <div className="img" style={{ backgroundImage: `url("${image}")` }} /> : null;

		const imageWithLink = slotID ? <Link to={`/settings/${slotID}`}>{imageElement}</Link> : imageElement;

		return (
			<div className="plant__elem">
				<div className="content">
					{imageWithLink}
					<span className="plant__name">{name}</span>
				</div>
			</div>
		);
	}
}
