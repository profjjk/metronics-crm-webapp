import Jobs from './Jobs';
import Requests from './Requests';
import Unpaid from './Unpaid';
import { useJobs, useRequests } from '../../../hooks';

const JobsTable = ({ viewRequests, viewUnpaid }) => {
    const jobs = useJobs();
    const requests = useRequests();

    switch (jobs.status || requests.status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: Failed to load data from database.</h4>;
        default:
            if (viewRequests) {
                return (
                    <Requests requests={requests.data.data}/>
                )
            } else if (viewUnpaid) {
                return (
                    <Unpaid jobs={jobs.data.data}/>
                )
            } else {
                return (
                    <Jobs jobs={jobs.data.data}/>
                )
            }
    }
}

export default JobsTable;

// TODO: add pagination for displaying data