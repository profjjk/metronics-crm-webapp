import {useEffect, useState} from 'react';
import {useRequests} from '../../../hooks';
import { Searchbar } from '../../index';
import dayjs from 'dayjs';

const Requests = ({ selectionHandler }) => {
    const { status, data, error, isFetching } = useRequests();
    const [jobList, setJobList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === 'success') setJobList(data.data);
    }, [status]);

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
                            <th>Date Submitted</th>
                            <th>Business Name</th>
                            <th>City</th>
                            <th>Contact Name</th>
                            <th>Phone #</th>
                        </tr>
                        </thead>

                        <tbody>
                        {jobList.map(job => (
                            <tr className={"table-item"} key={job._id} onClick={e => selectionHandler(e, job)}>
                                <td>{dayjs(job.createdAt).format("MMM DD YYYY")}</td>
                                <td>{job.customer.businessName}</td>
                                <td>{job.customer.address.city}, {job.customer.address.state}</td>
                                <td>{job.customer.contactName}</td>
                                <td>{job.customer.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {isFetching ? <p>Getting information from database...</p> : ""}
                </section>
            )
    }

}

export default Requests;