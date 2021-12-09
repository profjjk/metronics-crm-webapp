import { useEffect, useState } from "react";
import { useJobs } from "../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import './style.scss';

const JobsTable = ({searchTerm, statusFilter, selectionHandler, deleteJobHandler, setStatusFilter}) => {
    const { status, data, error, isFetching } = useJobs();
    const [jobList, setJobList] = useState([]);

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
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
            return (
                <section id={"jobsTable"}>
                    <div className={"section-header"}>
                        <h2>Service Jobs</h2>
                        <div className={"dropdown"}>
                            <FontAwesomeIcon className={"faChevronDown"} icon={faChevronDown}/>
                            <select onChange={e => setStatusFilter(e.target.value)}>
                                <option>Filter by status</option>
                                <option>Waiting</option>
                                <option>Scheduled</option>
                                <option>Completed</option>
                                <option>Canceled</option>
                            </select>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Service Date</th>
                                <th>Company Name</th>
                                <th>City</th>
                                <th className={"text-center"}>Invoice #</th>
                                <th className={"text-center"}>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item"} key={job._id} onClick={e => selectionHandler(e, job)}>
                                <td>{job.serviceDate ? dayjs(job.serviceDate).format("ddd MMM DD YYYY") : "--"}</td>
                                <td>{job.customer.businessName}</td>
                                <td>{job.customer.address.city}</td>
                                <td className={"text-center"}>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                                {job.status === 'Waiting' ? <td className={"text-center red"}>{job.status}</td> : <td className={"text-center"}>{job.status}</td>}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {isFetching ? <p>Getting information from database...</p> : ""}
                </section>
            );
    }
}

export default JobsTable;

// TODO: add pagination for displaying data