import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "../../hooks";
import { JobsTable, Searchbar, ServiceForm, AutoCompleteSearch } from "../../components";
import API from "../../utils/API";

const ServiceHome = () => {
    const { user } = useUser();
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

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }
    // if (user.auth === 'public') {
    //     return <Redirect to={'/'} />
    // }

    // EVENT HANDLERS
    const selectionHandler = (e, job) => {
        e.preventDefault();
        setJob(job);
        setCustomer(job.customer)
        setParts(job.parts)
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
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    selectionHandler={selectionHandler}
                    deleteJobHandler={deleteJobHandler}
                />
            </main>
        )
    }
    if (showForm) {
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
            </main>
        )
    }
}

export default ServiceHome;
