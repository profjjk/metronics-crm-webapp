import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Searchbar } from '../../index';
import dayjs from 'dayjs';

const Unpaid = ({ jobs }) => {
    const queryClient = useQueryClient();
    const [jobList, setJobList] = useState(jobs.filter(job => !job.isPaid));
    const [searchTerm, setSearchTerm] = useState("");

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
                    <tr className={"table-item"} key={job._id} onClick={() => {
                        queryClient.setQueryData('submissionType', 'edit');
                        queryClient.setQueryData('selectedJob', 'job');
                        queryClient.setQueryData('showForm', true);
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

export default Unpaid;