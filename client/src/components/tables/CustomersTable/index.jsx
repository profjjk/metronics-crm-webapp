import { useState, useEffect } from "react";
import { useCustomers } from "../../../hooks";
import { Searchbar } from '../../index';

const CustomersTable = ({ setSubmissionType, selectCustomer }) => {
    const {status, data, error, isFetching} = useCustomers();
    const [customerList, selectCustomerList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === 'success') selectCustomerList(data.data);
    }, [status, data]);

    // Search for customers
    useEffect(() => {
        if (status === 'success') {
            if (searchTerm === "") {
                selectCustomerList(data.data);
                return;
            }
            selectCustomerList(
                data.data.filter(customer => {
                    return customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.phone.includes(searchTerm)
                })
            );
        }
    }, [searchTerm, status]);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
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
                                <th>Business Name</th>
                                <th>Address</th>
                                <th className={"text-center"}>Contact</th>
                                <th className={"text-center"}>Phone #</th>
                            </tr>
                        </thead>

                        <tbody>
                        {customerList.map(customer => (
                            <tr className={"table-item"} key={customer._id} onClick={() => {
                                setSubmissionType("edit");
                                selectCustomer(customer);
                            }}>
                                <td>{customer.businessName}</td>
                                <td>
                                    {customer.address.street1}
                                    {customer.address.street2 !== "" ? ", " + customer.address.street2 : ""}<br/>
                                    {customer.address.city}, {customer.address.state} {customer.address.zipcode}
                                </td>
                                <td className={"text-center"}>{customer.contactName ? customer.contactName : "--"}</td>
                                <td className={"text-center"}>{customer.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {isFetching ? <p>Getting information from database...</p> : ""}
                </section>
            )
    }
}

export default CustomersTable;

// TODO: add pagination for displaying data