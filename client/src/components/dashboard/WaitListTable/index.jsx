import { useJobs } from '../../../hooks';

const WaitListTable = () => {
    const { status, data, error } = useJobs('status', 'Waiting');
    const headers = ["Business Name", "Contact Name", "Phone #", "Location", "Type"];

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message()}</h4>;
        default:
            return (
                <div className="my-5">
                    <h4 className="pt-5"><strong>Jobs that need to be scheduled</strong></h4>
                    <table className="table">
                        <thead>
                        <tr>
                            {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
                            <td />
                        </tr>
                        </thead>
                        <tbody>
                        {data.length > 0 ? data.map(job => (
                            <tr key={job._id}>
                                <td>{job.customer.businessName}</td>
                                <td>{job.customer.contactName}</td>
                                <td>{job.customer.phone}</td>
                                <td>{job.customer.address.city}, {job.customer.address.state}</td>
                                <td>{job.type}</td>
                                <td>
                                    <button
                                        className={"btn btn-success"}
                                        data-id={job._id}
                                    >&#10162;
                                    </button>
                                </td>
                            </tr>
                        )) : <></>}
                        </tbody>
                    </table>
                    {data.length < 1 ? <p className={"text-center text-muted"}>** No new jobs to display **</p> : <></>}
                </div>
            )
    }
}

export default WaitListTable;