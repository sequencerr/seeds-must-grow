import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CapsulesPage, NavBar, PlantsPage } from '.';

export function App() {
	return (
		<Router>
			<div className="App">
				<NavBar></NavBar>
				<Switch>
					<Route path="/plants" component={PlantsPage} exact />
					<Route path="/capsules" component={CapsulesPage} exact />
					<Redirect to="/" exact /> {/* Should be last */}
				</Switch>
			</div>
		</Router>
	);
}
