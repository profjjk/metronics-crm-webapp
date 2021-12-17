import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRequests } from '../../../react-query';
import { Searchbar } from '../../index';
import dayjs from 'dayjs';

const Requests = () => {
    const queryClient = useQueryClient();
    const { status, data, error } = useRequests();
    const [jobList, setJobList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter by search term
    useEffect(() => {
        if (status === 'success') {
            setJobList(
                data.data.filter(job => {
                    return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (job.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.customer.phone.includes(searchTerm));
                })
            );
        }
    }, [searchTerm, data]);

    switch (status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
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
                            <tr className={"table-item clickable"} key={job._id} onClick={() => {
                                queryClient.setQueryData('submissionType', 'new');
                                queryClient.setQueryData('selectedJob', job);
                                queryClient.setQueryData('selectedCustomer', job.customer);
                                queryClient.setQueryData('showServiceForm', true);
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
}

export default Requests;