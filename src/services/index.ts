import { CapsulesService } from './CapsulesService';
import { PlantsService } from './PlantsService';
import { SlotsService } from './SlotsService';

export const API_URL = 'https://lairion.pythonanywhere.com';
export const capsulesService = new CapsulesService();
export const plantsService = new PlantsService();
export const slotsService = new SlotsService();
