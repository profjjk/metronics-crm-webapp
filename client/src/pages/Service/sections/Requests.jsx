import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useRequests } from '../../../react-query';
import { Searchbar } from '../../../components';
import dayjs from 'dayjs';

const Requests = () => {
    const qc = useQueryClient();
    const history = useHistory();
    const { url } = useRouteMatch();
    const { status, data: requests, error} = useRequests();
    const [requestList, setRequestList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dollarUSLocale = Intl.NumberFormat('en-US');

    // Filter by search term
    useEffect(() => {
        if (status === 'success') {
            setRequestList(
                requests.data.filter(request => {
                    return request.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (request.customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.customer.phone.includes(searchTerm));
                })
            );
        }
    }, [searchTerm, requests]);

    switch (status) {
        case 'loading':
            return <h1 className={'text-center'}>Loading</h1>;
        case 'error':
            return <h4 className={'text-center'}>Error: {error.message}</h4>;
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
                                qc.setQueryData('submissionType', 'new');
                                qc.setQueryData('selectedJob', {
                                    _id: request._id,
                                    status: "Pending",
                                    issueNotes: request.issueNotes,
                                    totalBill: dollarUSLocale.format(0)
                                });
                                qc.setQueryData('selectedCustomer', request.customer);
                                qc.setQueryData('deleteRequest', true);
                                history.push(`${url}/form`);
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