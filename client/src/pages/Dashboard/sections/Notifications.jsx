import { Link } from 'react-router-dom';

const Notifications = ({ jobs, requests, messages, parts }) => {
    return (
        <section className={"section-notifications"}>
            <h2>NOTIFICATIONS</h2>
            <div className={'notifications'}>
                {
                    jobs.length &&
                    <Link className={"notice"} to={'/service'}>
                        There are new jobs that need to be scheduled.
                    </Link>
                }
                {
                    requests.length &&
                    <Link className={"notice"} to={'/service/requests'}>
                        There are new online requests awaiting your review.
                    </Link>
                }
                {
                    messages.length &&
                    <Link className={"notice"} to={'/dashboard/messages'}>
                        You have unread messages in your inbox.
                    </Link>
                }
                {
                    parts.length &&
                    <Link className={"notice"} to={'/inventory/restock'}>
                        Some parts need to be re-ordered.
                    </Link>
                }
                {
                    !parts.length && !jobs.length && !requests.length && !messages.length &&
                    <p className={"empty-notifications"}>
                        ** You're all caught up. **
                    </p>
                }
            </div>
        </section>
    )
}

export default Notifications;