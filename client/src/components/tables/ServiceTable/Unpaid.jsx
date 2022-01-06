import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useJobs } from '../../../react-query';
import { Searchbar } from '../../index';
import API from '../../../utils/API';
import dayjs from 'dayjs';

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

    // MUTATION
    const editJob = useMutation(job => API.updateJob(job.id, job.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        }
    });

    const markPaid = (job) => {
        editJob.mutate({ id: job._id, data: {...job, isPaid: true} });
    }

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
                        <tr className={"tr-job"}>
                            <th className={"text-center"}>Service Date</th>
                            <th>Business Name</th>
                            <th className={"text-center"}>Invoice #</th>
                            <th className={"text-center"}>Total Bill</th>
                            <th/>
                        </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item tr-job"} key={job._id}>
                                <td className={"text-center"}>{job.serviceDate ? dayjs(job.serviceDate).format("MMM DD YYYY") : "--"}</td>
                                <td>{job.customer.businessName}</td>
                                <td className={"text-center"}>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                                <td className={"text-center"}>$ {job.totalBill}</td>
                                <td className={"mark-paid text-center"} onClick={() => markPaid(job)}>Mark as paid</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {jobList.length < 1 ? <p className={"empty"}>** No unpaid jobs to display **</p> : <></>}
                </section>
            )
    }
}

export default Unpaid;