import { useEffect, useState } from "react";
import { useJobs } from "../../../hooks";
import dayjs from "dayjs";

const JobsTable = ({searchTerm, statusFilter, selectionHandler, deleteJobHandler, setStatusFilter}) => {
    const { status, data, error, isFetching } = useJobs();
    const [jobList, setJobList] = useState([]);
    const headers = ["Invoice #", "Service Date", "Company Name", "City", "Type", "Status"];

    useEffect(() => {
        if (status === 'success') setJobList(data.data);
    }, [status]);

    // Filter by search results
    useEffect(() => {
        if (status === 'success') {
            if (!searchTerm) {
                setJobList(data.data);
                return;
            }
            setJobList(
                data.data.filter(job => {
                    return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (job.serviceDate !== null && job.serviceDate.includes(searchTerm)) ||
                        (job.invoiceNumber !== null && job.invoiceNumber.includes(searchTerm));
                })
            );
        }
    }, [searchTerm, status]);

    // Filter by status selection
    useEffect(() => {
        if (status === 'success') {
            if (statusFilter === "Waiting") {
                setJobList(data.data.filter(job => job.status === "Waiting"));
            } else if (statusFilter === "Scheduled") {
                setJobList(data.data.filter(job => job.status === "Scheduled"));
            } else if (statusFilter === "Completed") {
                setJobList(data.data.filter(job => job.status === "Completed"));
            } else if (statusFilter === "Canceled") {
                setJobList(data.data.filter(job => job.status === "Canceled"));
            } else {
                setJobList(data.data);
            }
        }
    }, [statusFilter, status]);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
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
                            <td/>
                        </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr key={job._id}>
                                <td>
                                    {job.invoiceNumber ? job.invoiceNumber : "--"}
                                </td>
                                <td>
                                    {job.serviceDate ? dayjs(job.serviceDate).format("ddd MMM DD YYYY") : "--"}
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
                                            onClick={e => selectionHandler(e, job)}
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
                    {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                </div>
            );
    }
}

export default JobsTable;

// TODO: add pagination for displaying data