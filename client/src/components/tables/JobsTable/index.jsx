import Jobs from './Jobs';
import Requests from './Requests';
import Unpaid from './Unpaid';

const JobsTable = ({ selectJob, setSubmissionType, viewRequests, viewUnpaid }) => {
    if (viewRequests) {
        return (
            <Requests selectJob={selectJob} setSubmissionType={setSubmissionType} />
        )
    } else if (viewUnpaid) {
        return (
            <Unpaid selectJob={selectJob} setSubmissionType={setSubmissionType} />
        )
    } else {
        return (
            <Jobs selectJob={selectJob} setSubmissionType={setSubmissionType} />
        )
    }
}

export default JobsTable;

// TODO: add pagination for displaying data