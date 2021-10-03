import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CapsulesPage, EmptyPage, NavBar, PlantsPage } from '.';

export function App() {
	return (
		<Router>
			<div className="App">
				<NavBar></NavBar>
				<div className="content">
					<Switch>
						<Route path="/plants" component={PlantsPage} exact />
						<Route path="/capsules" component={CapsulesPage} exact />
						<Route path="/tasks" component={EmptyPage} exact />
						<Route path="/messages" component={EmptyPage} exact />
						<Route path="/settings" component={EmptyPage} exact />
						<Route path="/call_center" component={EmptyPage} exact />
						<Redirect to="/" exact /> {/* Should be last */}
					</Switch>
				</div>
			</div>
		</Router>
	);
}
