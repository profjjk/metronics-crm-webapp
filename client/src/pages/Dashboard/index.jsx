import { Redirect } from 'react-router-dom';
import { useData, useMessages, useJobs, useUser } from '../../react-query';
import { Header, MessageTable } from './sections';

const DashboardPage = () => {
    const { user } = useUser();
    const { status: msgStatus, data: messages, error: msgError } = useMessages();
    const { status: jobStatus, data: jobs, error: jobError } = useJobs();
    const view = useData('view');

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    switch(jobStatus || msgStatus) {
        case "loading":
            return <h1 className="text-center">Loading</h1>;
        case "error":
            return <h4 className="text-center">Error: {jobError.message} | {msgError.message}</h4>;
        default:
            if (view === 'messages') {
                return (
                    <main className={"container"} id={"dashboard"}>
                        <Header />
                        <MessageTable messages={messages.data} />
                    </main>
                )
            } else {
                return (
                    <main className={"container"} id={"dashboard"}>
                        <Header />

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