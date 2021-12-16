import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useJobs } from '../../hooks';
import dayjs from 'dayjs';

const CustomerHistory = () => {
    const queryClient = useQueryClient();
    const history = useHistory();
    const { status, data, error } = useJobs();
    const [jobList, setJobList] = useState([]);
    const { data: customer } = useQuery('selectedCustomer', () => {});

    useEffect(() => {
        if (status === 'success') {
            const customerJobs = data.data.filter(job => job.customer._id === customer._id && job.status === 'Completed');
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
                        {jobList.length ? jobList.map(job => (
                            <tr className={"table-item"} key={job._id} onClick={() => {
                                queryClient.setQueryData('submissionType', 'edit');
                                queryClient.setQueryData('selectedJob', job);
                                queryClient.setQueryData('showForm', true);
                                history.push('/service');
                            }}>
                                <td>{job.serviceDate ? dayjs(job.serviceDate).format("ddd MMM DD YYYY") : "--"}</td>
                                <td>{job.invoiceNumber ? job.invoiceNumber : "--"}</td>
                                <td>{job.serviceNotes ? job.serviceNotes : ""}</td>
                            </tr>
                        )) : <tr><td className={"empty"}>** No job history to display **</td></tr>}
                        </tbody>
                    </table>
                </section>
            )
    }
}

export default CustomerHistory;
