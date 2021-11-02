import type { match } from 'react-router';

type RouteMatch = match & {
	params: Record<string, string>;
};
