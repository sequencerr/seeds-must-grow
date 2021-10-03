import { Component } from 'react';
import { PlantElem, PlantsForm } from '.';
import { PlantsService } from '../services';

export const plantsService = new PlantsService();

export class PlantsPage extends Component {
	state: { plants: Plant[] } = { plants: [] };

	async componentDidMount() {
		this.setState({ plants: await plantsService.getPlants() });
	}

	render() {
		return (
			<div>
				<PlantsForm></PlantsForm>
				{this.state.plants.map(p => (
					<PlantElem data={p} key={p.id}></PlantElem>
				))}
			</div>
		);
	}
}
