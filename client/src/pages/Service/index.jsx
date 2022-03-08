import { Redirect, BrowserRouter as Router, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useUser } from '../../react-query';
import { Table, Requests, Unpaid, Form } from './sections';
import { Header } from '../../components';
import './style.scss';

const ServicePage = () => {
	const { user } = useUser();
	const { path, url } = useRouteMatch();

	// REDIRECTS
	if(!user) {
		return <Redirect to={'/'}/>
	}

	const links = [
		{ name: 'View All', path: '/service' },
		{ name: 'View Requests', path: '/service/requests' },
		{ name: 'View Unpaid', path: '/service/unpaid' },
		{ name: 'Create New', path: '/service/form' }
	];

	return (
		<Router>
			<main className={'container'}>
				<Header
					pageTitle={'Service Jobs'}
					links={links}
				/>
				<Switch>
					<Route exact path={'/service'}>
						<Table />
					</Route>

					<Route path={`/service/requests`}>
						<Requests />
					</Route>

					<Route path={`/service/unpaid`}>
						<Unpaid />
					</Route>

					<Route path={`/service/form`}>
						<Form />
					</Route>
				</Switch>
			</main>
		</Router>
	)
}

export default ServicePage;
