import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRequests } from '../../../react-query';
import { Searchbar } from '../../index';
import dayjs from 'dayjs';

const Requests = () => {
    const queryClient = useQueryClient();
    const { status, data, error } = useRequests();
    const [requestList, setRequestList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter by search term
    useEffect(() => {
        if (status === 'success') {
            setRequestList(
                data.data.filter(request => {
                    return request.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (request.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.customer.phone.includes(searchTerm));
                })
            );
        }
    }, [searchTerm, data]);

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
                            <th className={"text-center"}>Date Submitted</th>
                            <th>Business Name</th>
                            <th>City</th>
                            <th className={"text-center"}>Contact Name</th>
                            <th className={"text-center"}>Phone #</th>
                        </tr>
                        </thead>

                        <tbody>
                        {requestList.map(request => (
                            <tr className={"table-item tr-job clickable"} key={request._id} onClick={() => {
                                queryClient.setQueryData('submissionType', 'new');
                                queryClient.setQueryData('selectedJob', {
                                    _id: request._id,
                                    status: "Pending",
                                    issueNotes: request.issueNotes
                                });
                                queryClient.setQueryData('selectedCustomer', request.customer);
                                queryClient.setQueryData('showServiceForm', true);
                            }}>
                                <td className={"text-center"}>{dayjs(request.createdAt).format("MMM D, YYYY")}</td>
                                <td>{request.customer.businessName}</td>
                                <td>{request.customer.address.city}, {request.customer.address.state}</td>
                                <td className={"text-center"}>{request.customer.contactName}</td>
                                <td className={"text-center"}>{request.customer.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {requestList.length < 1 ? <p className={"empty"}>** No online requests to display **</p> : <></>}
                </section>
            )
    }
}

export default Requests;