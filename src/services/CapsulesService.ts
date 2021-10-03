import axios from 'axios';
import { API_URL } from '.';

export class CapsulesService {
	async getCapsules() {
		const url = `${API_URL}/capsules/`;
		return (await axios.get(url)).data as Capsule[];
	}

	async getCapsuleByID(id: string) {
		const url = `${API_URL}/capsules/${id}/`;
		return (await axios.get(url)).data as Capsule;
	}
}
