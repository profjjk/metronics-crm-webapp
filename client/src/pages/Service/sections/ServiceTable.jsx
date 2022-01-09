import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Searchbar } from '../../../components';
import { sortPendingToTop } from '../../../utils/sort';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const ServiceTable = ({ jobs }) => {
    const qc = useQueryClient();
    const [jobList, setJobList] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter by status
    useEffect(() => {
        const sortedJobs = sortPendingToTop(jobs);
        if (statusFilter === "Pending") {
            setJobList(sortedJobs.filter(job => job.status === "Pending"));
        } else if (statusFilter === "Scheduled") {
            setJobList(sortedJobs.filter(job => job.status === "Scheduled"));
        } else if (statusFilter === "Completed") {
            setJobList(sortedJobs.filter(job => job.status === "Completed"));
        } else if (statusFilter === "Canceled") {
            setJobList(sortedJobs.filter(job => job.status === "Canceled"));
        } else {
            setJobList(sortedJobs);
        }
    }, [statusFilter, jobs]);

    // Filter by search term
    useEffect(() => {
        const sortedJobs = sortPendingToTop(jobs);
        if (searchTerm !== "") {
            setJobList(
                sortedJobs.filter(job => {
                    return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (job.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.serviceDate !== null && job.serviceDate.includes(searchTerm)) ||
                        (job.invoiceNumber !== null && job.invoiceNumber.includes(searchTerm));
                })
            );
        } else {
            setJobList(sortedJobs);
        }
    }, [searchTerm, jobs]);

    return (
        <section>
            <div className={"section-header"}>
                <div>
                    <Searchbar
                        placeholder={"Search"}
                        setSearch={setSearchTerm}
                    />
                </div>

                <div className={"dropdown"}>
                    <FontAwesomeIcon className={"faChevronDown"} icon={faChevronDown}/>
                    <select onChange={e => setStatusFilter(e.target.value)}>
                        <option>Filter by status</option>
                        <option>Pending</option>
                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </select>
                </div>
            </div>

            <table>
                <thead>
                <tr className={"tr-job"}>
                    <th className={"text-center"}>Service Date</th>
                    <th>Business Name</th>
                    <th>City</th>
                    <th className={"text-center"}>Invoice #</th>
                    <th className={"text-center"}>Status</th>
                </tr>
                </thead>

                <tbody>
                {jobList.map(job => (
                    <tr className={"table-item tr-job clickable"} key={job._id} onClick={() => {
                        qc.setQueryData('submissionType', 'edit');
                        qc.setQueryData('selectedJob', job);
                        qc.setQueryData('selectedCustomer', job.customer);
                        qc.setQueryData('view', 'serviceForm');
                    }}>
                        <td className={"text-center"}>{job.serviceDate ? dayjs(job.serviceDate).format("MMM D, YYYY") : "--"}</td>
                        <td>{job.customer.businessName}</td>
                        <td>{job.customer.address.city}</td>
                        <td className={"text-center"}>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                        <td className={"text-center"}>{job.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {jobList.length < 1 ? <p className={"empty"}>** No jobs to display **</p> : <></>}
        </section>
    )
}

export default ServiceTable;
