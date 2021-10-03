import axios from 'axios';
import { API_URL } from '.';

export class PlantsService {
	async getPlants() {
		const url = `${API_URL}/plants/`;
		return (await axios.get(url)).data as Plant[];
	}

	async getPlantByID(id: number) {
		const url = `${API_URL}/plants/${id}/`;
		return (await axios.get(url)).data as Plant;
	}

	async getPlantTypes() {
		const url = `${API_URL}/plant_types/`;
		return (await axios.get(url)).data as PlantType[];
	}

	async getPlantTypeByID(id: number) {
		const url = `${API_URL}/plant_types/${id}/`;
		return (await axios.get(url)).data as PlantType;
	}
}
