declare module '*.svg' {
	import type { FunctionComponent, SVGProps } from 'react';
	//https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
	export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
	const src: string;
	export default src;
}

declare module '*.png' {
	const src: string;
	export default src;
}

interface Capsule {
	id: number;
	name: string;
	slots_count: number;
	power: number;
	radiation: number;
	temperature: number;
	went_speed: number;
}

interface PlantType {
	id: number;
	name: string;
	description: string;
}

interface Plant {
	id: number;
	plant_type: number;
}

type PlantWithTypeData = Plant & PlantType;

interface GrowRule {
	id: number;
	name: string;
	is_active: boolean;
	plant: number;
}

interface Slot {
	id: number;
	name: string;
	radiation: number;
	capsule: number;
	plant: number | null;
}

interface Fertilizer {
	id: number;
	name: string;
}

interface FertilizerInRules {
	id: number;
	how_much: number;
	up_limit: number;
	down_limit: number;
	grow_rule: number;
	fertilizer: number;
}

interface FertilizerInSlots {
	id: number;
	capacity: number;
	fertilizer: number;
	slot: number;
}
