import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useJobs } from '../../../react-query';
import dayjs from 'dayjs';

const CustomerHistory = () => {
    const queryClient = useQueryClient();
    const history = useHistory();
    const { status: jobStatus, data: jobs, error } = useJobs();
    const { status: customerStatus, data: customer } = useQuery('selectedCustomer', () => {});
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        if (jobStatus === 'success' && customerStatus === 'success') {
            const customerJobs = jobs.data.filter(job => job.customer._id === customer._id && job.status === 'Completed');
            setJobList(customerJobs);
        }
    }, [jobStatus, jobs])

    switch (jobStatus) {
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
                        <tr className={"tr-history"}>
                            <th className={"text-center"}>Date Completed</th>
                            <th>Service Notes</th>
                        </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item clickable tr-history"} key={job._id} onClick={() => {
                                queryClient.setQueryData('submissionType', 'edit');
                                queryClient.setQueryData('selectedJob', job);
                                queryClient.setQueryData('showServiceForm', true);
                                history.push('/service');
                            }}>
                                <td className={"text-center"}>{job.serviceDate ? dayjs(job.serviceDate).format("MMM DD YYYY") : "--"}</td>
                                <td>{job.serviceNotes ? job.serviceNotes : ""}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {jobList.length < 1 ? <p className={"empty"}>** No job history to display **</p> : <></>}
                </section>
            )
    }
}

export default CustomerHistory;
