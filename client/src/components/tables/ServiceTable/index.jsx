import Jobs from './Jobs';
import Requests from './Requests';
import Unpaid from './Unpaid';

const JobsTable = ({ viewRequests, viewUnpaid }) => {
    if (viewRequests) {
        return (
            <Requests/>
        )
    } else if (viewUnpaid) {
        return (
            <Unpaid/>
        )
    } else {
        return (
            <Jobs/>
        )
    }
}

export default JobsTable;
