import axios from 'axios';
import { API_URL } from '.';

export class SlotsService {
	async getSlotByPlantID(id: number) {
		const url = `${API_URL}/slots/`;
		const slots = (await axios.get(url)).data as Slot[];
		return slots.find(s => s.plant == id);
	}

	async getSlotByID(id: string | number) {
		const parsedID = typeof id == 'string' ? parseInt(id) : id;
		if (Number.isNaN(parsedID)) throw new TypeError(`Incorrect String ID (${id}. Expected Integer type`);

		const url = `${API_URL}/slots/${id}/`;
		return (await axios.get(url)).data as Slot;
	}

	async updateRule(slotID: number, state: boolean) {
		const url = `${API_URL}/fertilizer_in_slots/${slotID}/`;
		return (await axios.patch(url, { is_turn_on: state } as FertilizerInSlots)).status == 200;
	}
}
