import { Redirect, BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useData, useMessages, useJobs, useUser, useRequests, useParts } from '../../react-query';
import { Calendar, MessageTable, Notifications, Revenue } from './sections';
import { Header } from '../../components';
import { ServiceForm } from '../Service/sections';
import './style.scss';

const DashboardPage = () => {
	const { user } = useUser();
	const { path, url } = useRouteMatch();
	const { status: msgStatus, data: messages, error: msgError } = useMessages();
	const { status: reqStatus, data: requests, error: reqError } = useRequests();
	const { status: jobStatus, data: jobs, error: jobError } = useJobs();
	const { status: partStatus, data: parts, error: partError } = useParts();
	const view = useData('view');

	// REDIRECTS
	if(!user) {
		return <Redirect to={'/'}/>
	}

    const links = [
        { name: 'Overview', path: '/dashboard' },
        { name: 'View Messages', path: '/dashboard/messages' }
    ]

	switch (jobStatus || msgStatus || reqStatus || partStatus) {
		case 'loading':
			return <h1 className="text-center">Loading</h1>;
		case 'error':
			return <h4
				className="text-center">Error: {jobError.message} | {msgError.message} | {reqError.message} | {partError.message}</h4>;
		default:
			return (
				<Router>
					<main className={'container'} id={'dashboard'}>
						<Header
                            pageTitle={'Dashboard'}
                            links={links}
                        />
						<Switch>
							<Route exact path={path}>
								<div className={'dashboard-top'}>
									<Notifications
										jobs={jobStatus === 'success' ? jobs.data.filter(job => job.status === 'Pending') : []}
										requests={reqStatus === 'success' ? requests.data : []}
										messages={msgStatus === 'success' ? messages.data.filter(msg => !msg.read) : []}
										parts={partStatus === 'success' ? parts.data.filter(part => part.stock < part.minimum) : []}
									/>

									<Revenue jobs={jobs.data.filter(job => job.status === 'Completed')}/>
								</div>

								<Calendar jobs={jobs.data}/>
							</Route>

							<Route path={`${url}/messages`}>
								<MessageTable messages={messages.data}/>
							</Route>
						</Switch>
					</main>
				</Router>
			)
	}
}

export default DashboardPage;