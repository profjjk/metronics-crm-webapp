import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

const Notifications = ({ jobs, requests, messages, parts }) => {
    const qc = useQueryClient();
    const history = useHistory();

    return (
        <section className={"section-notifications"}>
            <h2>NOTIFICATIONS</h2>
            <div>
                {jobs.length ? <p className={"notice"} onClick={() => {
                    qc.setQueryData('view', 'all');
                    history.push('/service');
                }}>
                    There are new jobs that need to be scheduled.
                </p> : <></>}

                {requests.length ? <p className={"notice"} onClick={() => {
                    qc.setQueryData('view', 'requests');
                    history.push('/service');
                }}>
                    There are new online requests awaiting your review.
                </p> : <></>}

                {messages.length ? <p className={"notice"} onClick={() => {
                    qc.setQueryData('view', 'messages');
                }}>
                    You have unread messages in your inbox.
                </p> : <></>}

                {parts.length ? <p className={"notice"} onClick={() => {
                    qc.setQueryData('view', 'restock');
                    history.push('/inventory');
                }}>
                    Some parts need to be re-ordered.
                </p> : <></>}

                {!parts.length && !jobs.length && !requests.length && !messages.length ?
                    <p className={"empty-notifications"}>
                        ** You're all caught up. **
                    </p> : <></>}
            </div>
        </section>
    )
}

export default Notifications;