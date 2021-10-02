import { useEffect, useState } from "react";

const JobsTable = ({ jobs, searchTerm, statusFilter, selectionHandler, deleteJobHandler, setStatusFilter }) => {
    const [jobList, setJobList] = useState(jobs);
    const headers = ["Invoice #", "Date Completed", "Company Name", "City", "Type", "Status"];

    // Filter by search results
    useEffect(() => {
        if (!searchTerm) {
            setJobList(jobs);
            return;
        }
        setJobList(jobs.filter(job => {
            if (job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            } else if (job.dateCompleted.toLowerCase() !== null && job.dateCompleted.toLowerCase().includes(searchTerm)) {
                return true;
            } else return job.invoiceNumber !== null && job.invoiceNumber.includes(searchTerm);
        }))
    }, [searchTerm, jobs]);

    // Filter by status selection
    useEffect(() => {
        if (statusFilter === "Waiting") {
            setJobList(jobs.filter(job => job.status === "Waiting"));
        } else if (statusFilter === "Scheduled") {
            setJobList(jobs.filter(job => job.status === "Scheduled"));
        } else if (statusFilter === "Completed") {
            setJobList(jobs.filter(job => job.status === "Completed"));
        } else if (statusFilter === "Canceled") {
            setJobList(jobs.filter(job => job.status === "Canceled"));
        } else {
            setJobList(jobs);
        }
    }, [statusFilter]);

    return (
        <div className="mt-5">
            <h3 className="float-start">Service Jobs:</h3>

            <div className="float-end">
                <select className="form-select" onChange={e => setStatusFilter(e.target.value)}>
                    <option>Filter by status</option>
                    <option>Waiting</option>
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Canceled</option>
                </select>
            </div>

            <table className="table">
                <thead>
                <tr>
                    {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
                    <td />
                </tr>
                </thead>

                <tbody>
                {jobList.map(job => (
                    <tr key={job._id}>
                        <td className="text-center">
                            {job.invoiceNumber ? job.invoiceNumber : "--"}
                        </td>
                        <td className="text-center">
                            {job.dateCompleted ? job.dateCompleted : "--"}
                        </td>
                        <td>{job.customer.businessName}</td>
                        <td>{job.customer.address.city}</td>
                        <td>{job.type}</td>
                        <td>{job.status}</td>
                        <td>
                            <div className="float-end">
                                <button
                                    className="btn btn-secondary"
                                    data-id={job._id}
                                    onClick={selectionHandler}
                                    >&#10162;
                                </button>
                                <button
                                    className="btn btn-danger ms-4"
                                    data-id={job._id}
                                    onClick={deleteJobHandler}
                                    >X
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobsTable;