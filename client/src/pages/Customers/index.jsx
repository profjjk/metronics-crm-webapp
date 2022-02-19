import { Redirect, BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useData, useCustomers, useUser, useJobs } from '../../react-query';
import { Table, History, Form } from './sections';
import { Header } from '../../components';
import './style.scss';

const CustomerPage = () => {
    const { user } = useUser();
    const { path, url } = useRouteMatch();
    const { status: customerStatus, data: customers, error: customerError } = useCustomers();
    const { status: jobStatus, data: jobs, error: jobError } = useJobs();

    // REDIRECT
    if (!user) {
        return <Redirect to={'/'} />
    }

    const links = [
        { name: 'View All', path: '/customers' },
        { name: 'Create New', path: '/customers/new' }
    ]

    switch(customerStatus || jobStatus) {
        case "loading":
            return <h1 className="text-center">Loading</h1>;
        case "error":
            return <h4 className="text-center">Error: {customerError.message} {jobError.message}</h4>;
        default:
            return (
                <Router>
                    <main className={'container'}>
                        <Header
                            pageTitle={'Customers'}
                            links={links}
                        />
                        <Switch>
                            <Route exact path={path}>
                                <Table customers={customers.data} />
                            </Route>

                            <Route path={`${path}/new`}>
                                <Form />
                            </Route>

                            <Route path={`${path}/view`}>
                                <Form />
                                <History />
                            </Route>
                        </Switch>
                    </main>
                </Router>
            )
    }
}

export default CustomerPage;
