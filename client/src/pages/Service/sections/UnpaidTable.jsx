import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Searchbar } from '../../../components';
import API from '../../../utils/API';
import dayjs from 'dayjs';

const UnpaidTable = ({ jobs }) => {
    const qc = useQueryClient();
    const [jobList, setJobList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dollarUSLocale = Intl.NumberFormat('en-US');

    // Filter by search term
    useEffect(() => {
        if (searchTerm === "") {
            setJobList(jobs.filter(job => !job.isPaid && job.status === 'Completed'));
        } else {
            setJobList(
                jobList.filter(job => {
                    return job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (job.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (job.customer.phone.includes(searchTerm));
                })
            );
        }
    }, [searchTerm, jobs]);

    // MUTATION
    const editJob = useMutation(job => API.updateJob(job.id, job.data), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });

    const markPaid = (job) => {
        editJob.mutate({ id: job._id, data: {...job, isPaid: true} });
    }

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
                        <td className={"text-center"}>{job.serviceDate ? dayjs(job.serviceDate).format("MMM D, YYYY") : "--"}</td>
                        <td>{job.customer.businessName}</td>
                        <td className={"text-center"}>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                        <td className={"text-center"}>$ {dollarUSLocale.format(job.totalBill)}</td>
                        <td className={"mark-paid text-center"} onClick={() => markPaid(job)}>Mark as paid</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {jobList.length < 1 ? <p className={"empty"}>** No unpaid jobs to display **</p> : <></>}
        </section>
    )
}

export default UnpaidTable;