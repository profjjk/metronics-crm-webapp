import { Redirect, BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useUser } from '../../react-query';
import { Calendar, Messages, Notifications, Revenue } from './sections';
import { Header } from '../../components';
import './style.scss';

const DashboardPage = () => {
	const { user } = useUser();
	const { path, url } = useRouteMatch();

	// REDIRECTS
	if(!user) {
		return <Redirect to={'/'}/>
	}

    const links = [
        { name: 'Overview', path: '/dashboard' },
        { name: 'View Messages', path: '/dashboard/messages' }
    ]

	return (
		<Router>
			<main className={'container'}>
				<Header
                    pageTitle={'Dashboard'}
                    links={links}
                />
				<Switch>
					<Route exact path={path}>
						<div className={'dashboard-top'}>
							<Notifications />
							<Revenue />
						</div>

						<Calendar />
					</Route>

					<Route path={`${url}/messages`}>
						<Messages />
					</Route>
				</Switch>
			</main>
		</Router>
	)
}

export default DashboardPage;