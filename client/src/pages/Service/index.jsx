import { Redirect } from 'react-router-dom';
import { useUser, useData, useJobs, useRequests } from '../../react-query';
import { Header, ServiceTable, RequestTable, UnpaidTable, ServiceForm } from './sections';
import './style.scss';

const ServicePage = () => {
    const { user } = useUser();
    const { status: jobStatus, data: jobs, error: jobError } = useJobs();
    const { status: reqStatus, data: requests, error: reqError } = useRequests();
    const view = useData('view');

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    switch(jobStatus || reqStatus) {
        case "loading":
            return <h1 className="text-center">Loading</h1>;
        case "error":
            return <h4 className="text-center">Error: {jobError.message} {reqError.message}</h4>;
        default:
            if (view === 'serviceForm') {
                return (
                    <main className={"container"}>
                        <Header />
                        <ServiceForm />
                    </main>
                )
            } else if (view === 'requests') {
                return (
                    <main className={"container"}>
                        <Header />
                        <RequestTable requests={requests.data} />
                    </main>
                )
            } else if (view === 'unpaid') {
                return (
                    <main className={"container"}>
                        <Header />
                        <UnpaidTable jobs={jobs.data} />
                    </main>
                )
            } else {
                return (
                    <main className={"container"}>
                        <Header />
                        <ServiceTable jobs={jobs.data} />
                    </main>
                )
            }
    }
}

export default ServicePage;
