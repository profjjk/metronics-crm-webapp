import Jobs from './Jobs';
import Requests from './Requests';

const JobsTable = ({ selectionHandler, viewRequests }) => {
    if (viewRequests) {
        return (
            <Requests selectionHandler={selectionHandler} />
        )
    } else {
        return (
            <Jobs selectionHandler={selectionHandler} />
        )
    }
}

export default JobsTable;

// TODO: add pagination for displaying data