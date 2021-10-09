import axios from 'axios';
import { API_URL } from '.';

export class CapsulesService {
	private capsules: Capsule[] = [];

	async getCapsules() {
		const url = `${API_URL}/capsules/`;
		const newData = (await axios.get(url)).data as Capsule[];
		if (this.capsules.length) {
			return this.capsules;
		} else {
			this.capsules = newData;
			return newData;
		}
	}

	async getCapsuleByID(id: string) {
		const url = `${API_URL}/capsules/${id}/`;
		const newData = (await axios.get(url)).data as Capsule;
		if (!this.capsules.find(e => e.id == newData.id)) this.capsules.push(newData);
		return newData;
	}

	findCapsuleByID(id: string) {
		return this.capsules.find(e => e.id.toString() == id);
	}
}
