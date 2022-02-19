import { Link } from 'react-router-dom';
import { useJobs, useMessages, useParts, useRequests } from '../../../react-query';

const Notifications = () => {
    const { status: reqStatus, data: requests, error: reqError } = useRequests();
    const { status: partStatus, data: parts, error: partError } = useParts();
    const { status: jobStatus, data: jobs, error: jobError } = useJobs();
    const { status: msgStatus, data: messages, error: msgError } = useMessages();

    switch (jobStatus || msgStatus || reqStatus || partStatus) {
        case 'loading':
            return <h1 className="text-center">Loading</h1>;
        case 'error':
            return <h4 className="text-center">Error: {jobError.message} | {msgError.message} | {reqError.message} | {partError.message}</h4>;
        default:
            return (
                <section className={"section-notifications"}>
                    <h2>NOTIFICATIONS</h2>
                    <div className={'notifications'}>
                        {
                            jobs.data.filter(job => job.status === 'Pending').length &&
                            <Link className={"notice"} to={'/service'}>
                                There are new jobs that need to be scheduled.
                            </Link>
                        }
                        {
                            requests.data.length &&
                            <Link className={"notice"} to={'/service/requests'}>
                                There are new online requests awaiting your review.
                            </Link>
                        }
                        {
                            messages.data.filter(msg => !msg.read).length &&
                            <Link className={"notice"} to={'/dashboard/messages'}>
                                You have unread messages in your inbox.
                            </Link>
                        }
                        {
                            parts.data.filter(part => part.stock < part.minimum).length &&
                            <Link className={"notice"} to={'/inventory/restock'}>
                                Some parts need to be re-ordered.
                            </Link>
                        }
                        {
                            !parts.data.filter(part => part.stock < part.minimum).length &&
                            !jobs.data.filter(job => job.status === 'Pending').length &&
                            !messages.data.filter(msg => !msg.read).length &&
                            !requests.data.length &&
                            <p className={"empty-notifications"}>
                                ** You're all caught up. **
                            </p>
                        }
                    </div>
                </section>
            )
    }
}

export default Notifications;