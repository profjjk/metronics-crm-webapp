import { useState } from 'react';
import { useCustomers, useJobs } from '../../hooks';
import { Searchbar, CustomersTable, CustomerForm } from "../../components";
import { useMutation, useQueryClient } from "react-query";
import API from "../../utils/API";

const CustomerHome = () => {
    const { status, data, error, isFetching } = useCustomers();
    const [customer, setCustomer] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);

    // MUTATIONS
    const queryClient = useQueryClient();
    const createCustomer = useMutation(customer => API.createCustomer(customer), {
        onSuccess: () => {
            queryClient.invalidateQueries(["customers", "all"]);
        }
    });
    const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["customers", "all"]);
            queryClient.invalidateQueries(["jobs", "all"]);
        }
    });
    const deleteCustomer = useMutation(id => API.deleteCustomer(id), {
        onSuccess: () => {
            queryClient.invalidateQueries("customers");
            console.log("Customer deleted!");
        },
    });
    const deleteJobs = useMutation(id => API.deleteJobsByCustomerId(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["jobs", "all"]);
        }
    });

    // EVENT HANDLERS
    const selectionHandler = e => {
        e.preventDefault();
        let customer = data.data.filter(customer => customer._id === e.target.dataset.id);
        setCustomer(customer[0]);
        setEdit(true);
        setShowForm(true);
    };
    const deleteCustomerHandler = async e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) {
            await deleteCustomer.mutate(e.target.dataset.id)
            deleteJobs.mutate(e.target.dataset.id)
        }
    }
    const submitHandler = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target))
            const customerData = {
                businessName: formData.businessName,
                contactName: formData.contactName,
                phone: formData.phone,
                address: {
                    street1: formData.street1,
                    street2: formData.street2,
                    city: formData.city,
                    state: formData.state,
                    zipcode: formData.zipcode
                }
            }
            if (edit) {
                editCustomer.mutate({ id: customer._id, data: customerData});
                setEdit(false);
                setShowForm(false);
                return
            }
            await createCustomer.mutateAsync(customerData);
            setShowForm(false);
        } catch(err) { console.error(err) }
    };

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            if (!showForm) {
                return (
                    <main>
                        <div className="p-5">
                            <Searchbar
                                heading="Customer Search"
                                subheading="Search by business name, city name, or phone #"
                                placeholder="Business Name, city name, or phone #"
                                setSearch={setSearchTerm}
                            />
                            <button
                                className="btn btn-success me-3 mt-5"
                                onClick={() => {
                                    setEdit(false);
                                    setShowForm(true);
                                }}
                                >Create New Customer
                            </button>
                            <CustomersTable
                                setShowFormUpdate={setShowForm}
                                selectionHandler={selectionHandler}
                                deleteHandler={deleteCustomerHandler}
                                searchTerm={searchTerm}
                                customers={data.data}
                            />
                            {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </div>
                    </main>
                )
            }

            if (showForm) {
                return (
                    <main>
                        <div className="p-5">
                            <CustomerForm
                                setShowForm={setShowForm}
                                submitHandler={submitHandler}
                                customer={edit ? customer : null}
                            />
                            {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </div>
                    </main>
                )
            }
    }
}

export default CustomerHome;
