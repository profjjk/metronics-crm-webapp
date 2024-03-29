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
        return <Redirect to={'/'} />
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
                                jobs={jobStatus === 'success' ? jobs.data.filter(job => job.status === 'Pending') : []}
                                requests={reqStatus === 'success' ? requests.data : []}
                                messages={msgStatus === 'success' ? messages.data.filter(msg => !msg.read) : []}
                                parts={partStatus === 'success' ? parts.data.filter(part => part.stock < part.minimum) : []}
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