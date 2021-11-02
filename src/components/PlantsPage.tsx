import { Component } from 'react';
import { PlantElem } from '.';
import { plantsService } from '../services';

export class PlantsPage extends Component {
	state: { plants: Plant[] } = { plants: [] };

	async componentDidMount() {
		this.setState({ plants: await plantsService.getPlants() });
	}

	render() {
		return (
			<div id="Plants">
				<span className="page__name">All plants in the capsules</span>

				{this.state.plants.map(p => (
					<PlantElem data={p} key={p.id}></PlantElem>
				))}
			</div>
		);
	}
}
