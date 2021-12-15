import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from '../../hooks';
import { CustomersTable, CustomerForm, SideNavbar } from "../../components";
import CustomerHistory from './CustomerHistory';
import API from "../../utils/API";
import './style.scss';

const CustomerHome = () => {
    const { user } = useUser();
    const [customer, setCustomer] = useState();
    const [showForm, setShowForm] = useState(false);
    const [submissionType, setSubmissionType] = useState('new');

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

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    // EVENT HANDLERS
    const selectCustomer = customer => {
        setCustomer(customer)
        setShowForm(true);
    };
    const removeCustomer = async e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\n" +
            "This will delete the customer and their service history from the database.\n" +
            "This cannot be undone.")
        if (answer) {
            await deleteCustomer.mutate(e.target.dataset.id)
            deleteJobs.mutate(e.target.dataset.id)
        }
    }
    const submit = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target))
            const customerData = {
                businessName: formData.businessName.trim(),
                contactName: formData.contactName.trim(),
                phone: formData.phone.trim(),
                address: {
                    street1: formData.street1.trim(),
                    street2: formData.street2.trim(),
                    city: formData.city.trim(),
                    state: formData.state.trim(),
                    zipcode: formData.zipcode.trim()
                },
                notes: FormData.notes.trim()
            }
            if (submissionType === 'edit') {
                editCustomer.mutate({ id: customer._id, data: customerData});
                setShowForm(false);
                return
            }
            if (submissionType === 'new') {
                await createCustomer.mutateAsync(customerData);
                setShowForm(false);
            }
        } catch(err) { console.error(err) }
    };

    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Customers</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => {
                        setShowForm(false);
                    }}>View All</p>

                    <p className={"btn"} onClick={() => {
                        setSubmissionType("new")
                        setCustomer(null);
                        setShowForm(true);
                    }}>Create New</p>
                </div>
            </div>
        )
    }

    if (!showForm) {
        return (
            <>
                <header>
                    <SideNavbar />
                </header>

                <main className={"container"}>
                    <Header />

                    <CustomersTable
                        setSubmissionType={setSubmissionType}
                        selectCustomer={selectCustomer}
                        removeCustomer={removeCustomer}
                    />
                </main>
            </>
        )
    }

    if (showForm) {
        return (
            <>
                <header>
                    <SideNavbar />
                </header>

                <main className={"container"}>
                    <Header />

                    <CustomerForm
                        customer={customer}
                        setCustomer={setCustomer}
                        setShowForm={setShowForm}
                    />

                    <CustomerHistory
                        customerId={customer._id}
                    />
                </main>
            </>
        )
    }

    // if (!showForm) {
    //     return (
    //         <>
    //             <header>
    //                 <SideNavbar/>
    //             </header>
    //
    //             <main className={"container"}>
    //                 <Searchbar
    //                     heading="Customer Search"
    //                     subheading="Search by business name, city name, or phone #"
    //                     placeholder="Business Name, city name, or phone #"
    //                     setSearch={setSearchTerm}
    //                 />
    //                 <button
    //                     className="btn btn-success me-3 mt-5"
    //                     onClick={() => {
    //                         setEdit(false);
    //                         setShowForm(true);
    //                     }}
    //                 >Create New Customer
    //                 </button>
    //                 <CustomersTable
    //                     setShowFormUpdate={setShowForm}
    //                     selectionHandler={selectionHandler}
    //                     deleteHandler={deleteCustomerHandler}
    //                     searchTerm={searchTerm}
    //                 />
    //             </main>
    //         </>
    //     )
    // }
    //
    // if (showForm) {
    //     return (
    //         <>
    //             <header>
    //                 <SideNavbar/>
    //             </header>
    //
    //             <main className={"container"}>
    //                 <div className="p-5">
    //                     <CustomerForm
    //                         setShowForm={setShowForm}
    //                         submitHandler={submitHandler}
    //                         customer={edit ? customer : null}
    //                     />
    //
    //                 </div>
    //             </main>
    //         </>
    //     )
    // }
}

export default CustomerHome;
