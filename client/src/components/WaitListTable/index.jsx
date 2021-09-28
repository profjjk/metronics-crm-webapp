import { useEffect, useState } from 'react';

const WaitListTable = ({ jobs }) => {
    const [jobList, setJobList] = useState(jobs);
    const headers = ["Business Name", "Contact Name", "Phone #", "Location", "Type"];

    useEffect(() => {
        setJobList(jobs.filter(job => job.status.toLowerCase() === 'waiting'))
    }, [jobs]);

    return (
        <div className="my-5">
            <h4 className="pt-5"><strong>Jobs that need to be scheduled</strong></h4>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map(header => <th scope="col">{header}</th>)}
                        <td />
                    </tr>
                </thead>
                <tbody>
                {jobList.map(job => (
                    <tr key={job._id}>
                        <td>{job.customer.businessName}</td>
                        <td>{job.customer.contactName}</td>
                        <td>{job.customer.phone}</td>
                        <td>{job.customer.address.city}, {job.customer.address.state}</td>
                        <td>{job.type}</td>
                        <td>
                            <button
                                className={"btn btn-success"}
                                data-id={job._id}
                                >&#10162;
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default WaitListTable;