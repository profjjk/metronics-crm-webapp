import {useState, useEffect} from "react";
import {useCustomers} from "../../../hooks";

const CustomersTable = ({selectionHandler, deleteHandler, searchTerm}) => {
    const {status, data, error, isFetching} = useCustomers();
    const [customerList, setCustomerList] = useState([]);
    const headers = ["Business Name", "Address", "Phone #", "Contact Name"];

    useEffect(() => {
        if (status === 'success') setCustomerList(data.data);
    }, [isFetching]);

    // Search for customers
    useEffect(() => {
        if (status === 'success') {
            if (searchTerm === "") {
                setCustomerList(data.data);
                return;
            }
            setCustomerList(
                data.data.filter(customer => {
                    return customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.phone.includes(searchTerm)
                })
            );
        }
    }, [searchTerm, data]);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            return (
                <div className="mt-5">
                    <h3 className="float-start">Customer Search Results:</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
                            <td/>
                        </tr>
                        </thead>

                        <tbody>
                        {customerList.map(customer => (
                            <tr key={customer._id}>
                                <td>{customer.businessName}</td>
                                <td>
                                    {customer.address.street1}
                                    {customer.address.street2 !== "" ? ", " + customer.address.street2 : ""}
                                    <br/>
                                    {customer.address.city}, {customer.address.state} {customer.address.zipcode}
                                </td>
                                <td>{customer.phone}</td>
                                <td>{customer.contactName}</td>
                                <td>
                                    <div className="float-end">
                                        <button
                                            className="btn btn-warning"
                                            data-id={customer._id}
                                            onClick={e => selectionHandler(e, customer)}
                                        >view
                                        </button>
                                        <button
                                            className="btn btn-danger ms-4"
                                            data-id={customer._id}
                                            onClick={deleteHandler}
                                        >X
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                </div>
            );
    }
}

export default CustomersTable;

// TODO: add pagination for displaying data