import { useJobs } from '../../../react-query';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';

const WaitListTable = () => {
    const { status, data, error } = useJobs();
    const [jobList, setJobList] = useState([]);
    const headers = ["Date Submitted", "Business Name", "Contact Name", "Phone #", "Location"];

    useEffect(() => {
        if (status === 'success') setJobList(data.data.filter(job => job.status === 'Waiting'));
    }, [status]);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            return (
                <section className="section-waitList">
                    <div className="section-header">
                        <h2>New Jobs</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
                            </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item"} key={job._id} data-id={job._id}>
                                <td>{dayjs(job.createdAt).format("MMM DD YYYY")}</td>
                                <td>{job.customer.businessName}</td>
                                <td>{job.customer.contactName}</td>
                                <td>{job.customer.phone}</td>
                                <td>{job.customer.address.city}, {job.customer.address.state}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {jobList.length < 1 ? <p className={"empty"}>** No new jobs to display **</p> : <></>}
                </section>
            )
    }
}

export default WaitListTable;