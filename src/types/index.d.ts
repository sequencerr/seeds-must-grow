declare module '*.svg' {
	import type { FunctionComponent, SVGProps } from 'react';

	type ComponentSVG = FunctionComponent<
		SVGProps<SVGSVGElement> & {
			title?: string;
		}
	>; //https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
	export const ReactComponent: ComponentSVG;
	const src: ComponentSVG;
	export default src;
}

declare module '*.png' {
	const src: string;
	export default src;
}

interface Capsule {
	readonly id: number;
	name: string;
	slots_count: number;
	power: number;
	radiation: number;
	temperature: number;
	went_speed: number;
}

interface PlantType {
	readonly id: number;
	name: string;
	description: string;
	readonly image?: string;
}

interface Plant {
	readonly id: number;
	plant_type: PlantType;
}

type PlantWithTypeData = Plant & PlantType;

interface GrowRule {
	readonly id: number;
	name: string;
	is_active: boolean;
	plant: number;
}

interface Slot {
	readonly id: number;
	name: string;
	radiation: number;
	capsule: number;
	plant: number | null;
}

interface SlotWithParsedPlant {
	id: number;
	name: string;
	radiation: number;
	capsule: number;
	plant: PlantType | null;
}

interface Fertilizer {
	readonly id: number;
	name: string;
}

interface FertilizerInRules {
	readonly id: number;
	how_much: number;
	up_limit: number;
	down_limit: number;
	grow_rule: number;
	fertilizer?: number;
}

interface FertilizerInSlots {
	readonly id: number;
	fertilizer: Fertilizer;
	capacity: number;
	is_turn_on: boolean;
	slot?: number;
}
