import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Searchbar } from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const Jobs = ({ jobs }) => {
    const queryClient = useQueryClient();
    const [jobList, setJobList] = useState(jobs);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter by status
    useEffect(() => {
        if (statusFilter === "Pending") {
            setJobList(jobs.filter(job => job.status === "Pending"));
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

    // Filter by search term
    useEffect(() => {
        if (searchTerm !== "") {
            setJobList(
                jobs.filter(job => {
                    return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (job.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.serviceDate !== null && job.serviceDate.includes(searchTerm)) ||
                        (job.invoiceNumber !== null && job.invoiceNumber.includes(searchTerm));
                })
            );
        }
    }, [searchTerm]);
    
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
                <tr>
                    <th>Service Date</th>
                    <th>Business Name</th>
                    <th>City</th>
                    <th className={"text-center"}>Invoice #</th>
                    <th className={"text-center"}>Status</th>
                </tr>
                </thead>

                <tbody>
                {jobList.map(job => (
                    <tr className={"table-item"} key={job._id} onClick={() => {
                        queryClient.setQueryData('submissionType', 'edit');
                        queryClient.setQueryData('selectedJob', 'job');
                        queryClient.setQueryData('showForm', true);
                    }}>
                        <td>{job.serviceDate ? dayjs(job.serviceDate).format("ddd MMM DD YYYY") : "--"}</td>
                        <td>{job.customer.businessName}</td>
                        <td>{job.customer.address.city}</td>
                        <td className={"text-center"}>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                        <td className={"text-center"}>{job.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )

}

export default Jobs;