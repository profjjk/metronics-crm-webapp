import { useState } from 'react';
import { useCustomers, useJobs } from '../../hooks';
import { JobsTable, Searchbar, ServiceForm } from "../../components";
import { useMutation, useQueryClient } from "react-query";
import API from "../../API";
import AutoCompleteSearch from "../../components/job/AutoCompleteSearch";

const ServiceHome = () => {
    // STATE: Shared
    const { status, data, error, isFetching } = useJobs();
    const [showForm, setShowForm] = useState(false);
    const [newJob, setNewJob] = useState(false);

    // STATE: Service Form & Autocomplete
    const customers = useCustomers();
    const [parts, setParts] = useState([])
    const [searchResult, setSearchResult] = useState();
    const [found, setFound] = useState();

    // STATE: Jobs Table
    const [jobId, setJobId] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [statusFilter, setStatusFilter] = useState();

    // EVENT HANDLERS
    const statusHandler = e => {
        e.preventDefault();
        setStatusFilter(e.target.value);
    };

    const newJobHandler = e => {
        e.preventDefault();
        setNewJob(true);
        setShowForm(true);
    }

    const selectionHandler = async e => {
        e.preventDefault();
        setJobId(e.target.dataset.id);
        let job = data.filter(job => job._id === e.target.dataset.id);
        await setSearchResult(job);
        setShowForm(true);
    };

    const deleteJobHandler = e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) deleteJob.mutate(e.target.dataset.id)
    }

    const removePartHandler = e => {
        e.preventDefault();
        setParts(parts.filter(part => part.partNumber !== e.target.dataset.id));
    }

    const submitHandler = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target))
            const jobData = {
                status: formData.status,
                type: formData.type,
                dateCompleted: formData.dateCompleted,
                invoiceNumber: formData.invoiceNumber,
                issueNotes: formData.issueNotes,
                repairNotes: formData.repairNotes,
                parts: parts
            }
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

            if (found) {
                await editCustomer.mutate({ id: searchResult[0]._id, data: customerData});
                createJob.mutate({ customerId: searchResult[0]._id, ...jobData });
            } else {
                const newCustomer = await createCustomer.mutateAsync(customerData);
                createJob.mutate({ customerId: newCustomer.data._id, ...jobData });
            }
            setShowForm(false);
            setJobId(null);
        } catch(err) { console.error(err) }
    };

    // MUTATIONS
    const queryClient = useQueryClient();
    const deleteJob = useMutation(id => API.deleteJob(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["jobs", "all"]);
        }
    })
    const createJob = useMutation(job => API.createJob(job), {
        onSuccess: () => {
            queryClient.invalidateQueries(["jobs", "all"]);
        }
    });
    const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["customers", "all"]);
        }
    })
    const createCustomer = useMutation(customer => API.createCustomer(customer), {
        onSuccess: () => {
            queryClient.invalidateQueries(["customers", "all"]);
        }
    })

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            // let selectedJob = data.filter(job => job._id === jobId);

            if(showForm && newJob) {
                return (
                    <main>
                        <AutoCompleteSearch
                            data={data}
                            setSearchResult={setSearchResult}
                            setFound={setFound}
                        />
                        <ServiceForm
                            submitHandler={submitHandler}
                            removePartHandler={removePartHandler}
                            data={searchResult}
                            parts={parts}
                            setParts={setParts}
                            setShowForm={setShowForm}
                            newJob={newJob}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }
            if (showForm && !newJob) {
                return (
                    <main>
                        <ServiceForm
                            submitHandler={submitHandler}
                            removePartHandler={removePartHandler}
                            data={searchResult}
                            parts={parts}
                            setParts={setParts}
                            setShowForm={setShowForm}
                            newJob={newJob}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }
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
                            onClick={newJobHandler}
                            >Create New Service Job
                        </button>
                        <JobsTable
                            jobs={data}
                            searchTerm={searchTerm}
                            statusFilter={statusFilter}
                            statusHandler={statusHandler}
                            selectionHandler={selectionHandler}
                            // deleteHandler={deleteHandler}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }
    }
}

export default ServiceHome;
