import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Searchbar } from '../../index';
import dayjs from 'dayjs';
import { useJobs } from '../../../react-query';

const Unpaid = () => {
    const queryClient = useQueryClient();
    const { status, data, error } = useJobs();
    const [jobList, setJobList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === 'success') {
            setJobList(data.data.filter(job => !job.isPaid && job.status === 'Completed'));
        }
    }, [data])

    // Filter by search term
    useEffect(() => {
        if (searchTerm !== "") {
            setJobList(
                jobList.filter(job => {
                    return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (job.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.customer.phone.includes(searchTerm));
                })
            );
        }
    }, [searchTerm]);

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
                            <th>Service Date</th>
                            <th>Business Name</th>
                            <th className={"text-center"}>Invoice #</th>
                            <th className={"text-center"}>Total Bill</th>
                        </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item clickable"} key={job._id} onClick={() => {
                                queryClient.setQueryData('submissionType', 'edit');
                                queryClient.setQueryData('selectedJob', job);
                                queryClient.setQueryData('selectedCustomer', job.customer);
                                queryClient.setQueryData('showServiceForm', true);
                            }}>
                                <td>{job.serviceDate ? dayjs(job.serviceDate).format("ddd MMM DD YYYY") : "--"}</td>
                                <td>{job.customer.businessName}</td>
                                <td className={"text-center"}>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                                <td className={"text-center"}>$ {job.totalBill}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )
    }
}

export default Unpaid;