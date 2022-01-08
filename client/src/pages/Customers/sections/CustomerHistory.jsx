import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useData } from '../../../react-query';
import dayjs from 'dayjs';

const CustomerHistory = ({ jobs, customerId }) => {
    const qc = useQueryClient();
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        const history = jobs.filter(job => job.customer._id === customerId && job.status === 'Completed');
        setJobList(history);
    }, [customerId, jobs])

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
                        qc.setQueryData('submissionType', 'edit');
                        qc.setQueryData('selectedJob', job);
                        qc.setQueryData('view', 'serviceForm');
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

export default CustomerHistory;
