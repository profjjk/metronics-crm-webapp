import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Searchbar } from '../../index';
import dayjs from 'dayjs';

const Requests = ({ requests }) => {
    const queryClient = useQueryClient();
    const [jobList, setJobList] = useState(requests);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter by search term
    useEffect(() => {
        setJobList(
            jobList.filter(job => {
                return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (job.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (job.customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (job.customer.phone.includes(searchTerm));
            })
        );
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
            </div>

            <table>
                <thead>
                <tr>
                    <th>Date Submitted</th>
                    <th>Business Name</th>
                    <th>City</th>
                    <th>Contact Name</th>
                    <th>Phone #</th>
                </tr>
                </thead>

                <tbody>
                {jobList.map(job => (
                    <tr className={"table-item"} key={job._id} onClick={() => {
                        queryClient.setQueryData('submissionType', 'new');
                        queryClient.setQueryData('selectedJob', 'job');
                        queryClient.setQueryData('showForm', true);
                    }}>
                        <td>{dayjs(job.createdAt).format("MMM DD YYYY")}</td>
                        <td>{job.customer.businessName}</td>
                        <td>{job.customer.address.city}, {job.customer.address.state}</td>
                        <td>{job.customer.contactName}</td>
                        <td>{job.customer.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}

export default Requests;