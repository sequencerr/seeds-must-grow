import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CapsulePage, CapsulesPage, EmptyPage, NavBar, PlantsPage } from '.';

export function App() {
	return (
		<Router>
			<div className="App">
				<NavBar></NavBar>
				<div className="content">
					<Switch>
						<Route path="/" exact>
							<EmptyPage />
						</Route>
						<Route path="/plants">
							<PlantsPage />
						</Route>
						<Route path="/capsules/:id">
							<CapsulePage />
						</Route>
						{/* TODO: Add redirect for unexciting ids (X-Content-Type-Options: nosniff)
						<Route path="/capsules/:*">
							<Redirect to="/capsules" />
						</Route> */}
						<Route path="/capsules">
							<CapsulesPage />
						</Route>
						<Route path="/tasks">
							<EmptyPage />
						</Route>
						<Route path="/messages">
							<EmptyPage />
						</Route>
						<Route path="/settings">
							<EmptyPage />
						</Route>
						<Route path="/call_center">
							<EmptyPage />
						</Route>
						<Route path="*">
							<Redirect to="/" />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}
