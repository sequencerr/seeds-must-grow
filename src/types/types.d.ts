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
