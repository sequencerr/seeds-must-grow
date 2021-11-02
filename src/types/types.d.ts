import type { FunctionComponent, SVGProps } from 'react';
import type { match } from 'react-router';

type ComponentSVG = FunctionComponent<
	SVGProps<SVGSVGElement> & {
		title?: string;
	}
>;

type RouteMatch = match & {
	params: Record<string, string>;
};

type TargetType =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';
