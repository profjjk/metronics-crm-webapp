import { useJobs } from '../../hooks';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const CustomerHistory = ({ customerId }) => {
    const { status, data, error } = useJobs();
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        if (status === 'success') {
            const customerJobs = data.data.filter(job => job.customer._id === customerId && job.status === 'Completed');
            setJobList(customerJobs);
        }
    }, [status, data])

    switch (status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
            return (
                <section className={"customer-history"}>
                    <h2>Service History</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice #</th>
                            <th>Service Notes</th>
                        </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item"} key={job._id} onClick={() => {
                                // setSubmissionType("edit");
                                // selectJob(job);
                            }}>
                                <td>{job.serviceDate ? dayjs(job.serviceDate).format("ddd MMM DD YYYY") : "--"}</td>
                                <td>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                                <td>{job.serviceNotes ? job.serviceNotes : ""}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )
    }
}

export default CustomerHistory;