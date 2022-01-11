import { Redirect } from 'react-router-dom';
import { useData, useMessages, useJobs, useUser, useRequests, useParts } from '../../react-query';
import { Calendar, Header, MessageTable, Notifications, Revenue } from './sections';
import { ServiceForm } from '../Service/sections';
import './style.scss';

const DashboardPage = () => {
    const { user } = useUser();
    const { status: msgStatus, data: messages, error: msgError } = useMessages();
    const { status: reqStatus, data: requests, error: reqError } = useRequests();
    const { status: jobStatus, data: jobs, error: jobError } = useJobs();
    const { status: partStatus, data: parts, error: partError } = useParts();
    const view = useData('view');

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    switch(jobStatus || msgStatus || reqStatus || partStatus) {
        case "loading":
            return <h1 className="text-center">Loading</h1>;
        case "error":
            return <h4 className="text-center">Error: {jobError.message} | {msgError.message} | {reqError.message} | {partError.message}</h4>;
        default:
            if (view === 'messages') {
                return (
                    <main className={"container"} id={"dashboard"}>
                        <Header />
                        <MessageTable messages={messages.data} />
                    </main>
                )
            } else if (view === 'serviceForm') {
                return (
                    <main className={"container"} id={"dashboard"}>
                        <Header />
                        <ServiceForm />
                    </main>
                )
            } else {
                return (
                    <main className={"container"} id={"dashboard"}>
                        <Header />
                        <div className={"dashboard-top"}>
                            <Notifications
                                // jobs={jobs.data.length > 0 ? jobs.data.filter(job => job.status === 'Pending') : []}
                                // requests={requests.data.length > 0 ? requests.data : []}
                                // messages={messages.data.length > 0 ? messages.data.filter(msg => !msg.read) : []}
                                // parts={parts.data.length > 0 ? parts.data.filter(part => part.stock < part.minimum) : []}
                                jobs={jobs.data.filter(job => job.status === 'Pending')}
                                requests={requests.data}
                                messages={messages.data.filter(msg => !msg.read)}
                                parts={parts.data.filter(part => part.stock < part.minimum)}
                            />

                            <Revenue jobs={jobs.data.filter(job => job.status === 'Completed')} />
                        </div>
                        <Calendar jobs={jobs.data}/>
                    </main>
                )
            }
    }
}

export default DashboardPage;

// TODO: Add some interesting data on the top bar...
// - Number of jobs completed this year
// - Total number of customers
// - Unpaid invoices (need to add to data)
// - Total amount billed (need to add to data)