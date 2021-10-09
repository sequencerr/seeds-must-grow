import { Route as RouteBase, RouteProps } from 'react-router';

export class Route extends RouteBase {
	constructor(props: RouteProps) {
		super({ exact: true, ...props });
	}
}
