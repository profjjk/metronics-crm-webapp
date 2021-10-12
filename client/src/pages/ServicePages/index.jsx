import { useState } from 'react';
import { useCustomers, useJobs } from '../../hooks';
import {JobsTable, Searchbar, ServiceForm, AutoCompleteSearch, SideNavbar} from "../../components";
import { useMutation, useQueryClient } from "react-query";
import API from "../../utils/API";

const ServiceHome = () => {
    // STATE
    const { status, data, error, isFetching } = useJobs();

    const [showForm, setShowForm] = useState(false);
    const [found, setFound] = useState(false);
    const [edit, setEdit] = useState(false);

    const [job, setJob] = useState();
    const [parts, setParts] = useState([]);
    const [customer, setCustomer] = useState();

    const [searchTerm, setSearchTerm] = useState();
    const [statusFilter, setStatusFilter] = useState();

    // MUTATIONS
    const queryClient = useQueryClient();
    const createJob = useMutation(job => API.createJob(job), {
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        }
    });
    const editJob = useMutation(job => API.updateJob(job.id, job.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        }
    });
    const deleteJob = useMutation(id => API.deleteJob(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        }
    });
    const createCustomer = useMutation(customer => API.createCustomer(customer), {
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        }
    });
    const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        }
    });

    // EVENT HANDLERS
    const selectionHandler = e => {
        e.preventDefault();
        let job = data.data.filter(job => job._id === e.target.dataset.id);
        setJob(job[0]);
        setCustomer(job[0].customer)
        setParts(job[0].parts)
        setEdit(true)
        setShowForm(true);
    };
    const deleteJobHandler = e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) {
            setParts([])
            deleteJob.mutate(e.target.dataset.id)
        }
    }
    const removePartHandler = e => {
        e.preventDefault();
        setParts(parts.filter(part => part.partNumber !== e.target.dataset.id));
    }
    const submitHandler = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const jobData = {
                status: formData.status,
                type: formData.type,
                serviceDate: formData.serviceDate,
                invoiceNumber: formData.invoiceNumber.trim(),
                issueNotes: formData.issueNotes.trim(),
                repairNotes: formData.repairNotes.trim(),
                totalBill: parseFloat(formData.totalBill.trim()),
                isPaid: formData.isPaid === "on",
                parts: parts
            }
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
            }
            if (found) {
                editCustomer.mutate({ id: customer._id, data: customerData});
                createJob.mutate({ customer: customer._id, ...jobData });
                setFound(false);
                setShowForm(false);
                return
            }
            if (edit) {
                editCustomer.mutate({ id: customer._id, data: customerData});
                editJob.mutate({ id: job._id, data: jobData });
                setEdit(false);
                setShowForm(false);
                return
            }
            const newCustomer = await createCustomer.mutateAsync(customerData);
            createJob.mutate({ customer: newCustomer.data._id, ...jobData });
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
                        <Searchbar
                            heading={"Service Job Search"}
                            subheading={"Search by invoice #, date, or customer"}
                            placeholder={"Invoice #, date, or customer"}
                            setSearch={setSearchTerm}
                        />
                        <button
                            className="btn btn-success me-3 mt-5"
                            onClick={() => {
                                setEdit(false);
                                setShowForm(true);
                            }}
                        >Create New Service Job
                        </button>
                        <JobsTable
                            jobs={data.data || []}
                            searchTerm={searchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            selectionHandler={selectionHandler}
                            deleteJobHandler={deleteJobHandler}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }
            if(showForm) {
                return (
                    <main>
                        {!edit ? <AutoCompleteSearch
                            setCustomer={setCustomer}
                            setFound={setFound}
                        /> : <></>}
                        <ServiceForm
                            submitHandler={submitHandler}
                            removePartHandler={removePartHandler}
                            customer={edit || found ? customer : null}
                            parts={parts.length > 0 ? parts : []}
                            job={edit ? job : null}
                            setParts={setParts}
                            setShowForm={setShowForm}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }
    }
}

export default ServiceHome;
