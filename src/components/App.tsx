import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CapsulePage, CapsulesPage, EmptyPage, NavBar, PlantsPage } from '.';

export function App() {
	return (
		<Router>
			<div className="App">
				<NavBar></NavBar>
				<div className="content">
					<Switch>
						<Route path="/" component={EmptyPage} exact />
						<Route path="/plants" component={PlantsPage} />
						<Route path="/capsules/:id" component={CapsulePage} />
						<Route path="/capsules" component={CapsulesPage} />
						<Route path="/tasks" component={EmptyPage} />
						<Route path="/messages" component={EmptyPage} />
						<Route path="/call_center" component={EmptyPage} />
						<Route path="*">
							<Redirect to="/" />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}
