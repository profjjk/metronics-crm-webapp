import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useJobs } from '../../hooks';
import {JobsTable, Searchbar, ServiceForm} from "../../components";
import {useMutation, useQueryClient} from "react-query";
import API from "../../API";
import AutoCompleteSearch from "../../components/job/AutoCompleteSearch";

const ServiceHome = () => {
    const { status, data, error, isFetching } = useJobs();
    const history = useHistory();
    const [jobId, setJobId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [jobStatus, setJobStatus] = useState('');
    const [showForm, setShowForm] = useState(false);

    // EVENT HANDLERS
    const statusHandler = e => {
        e.preventDefault();
        setJobStatus(e.target.value);
    };

    const selectionHandler = e => {
        e.preventDefault();
        setJobId(e.target.dataset.id);
    };

    const deleteJobHandler = async e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) {
            await deleteJob.mutate(e.target.dataset.id)
            return
        }
        console.log("Job not deleted");
    }

    const deleteHandler = e => {
        e.preventDefault();
        setParts(parts.filter(part => part.partNumber !== e.target.dataset.id));
    }

    const partHandler = async e => {
        try {
            e.preventDefault();
            let part = await API.searchParts('partNumber', partNumber.current.value.toUpperCase())
            const partInfo = {
                partNumber: partNumber.current.value.toUpperCase(),
                description: part.data[0].description,
                quantity: parseInt(partQuantity.current.value)
            }
            setParts([...parts, partInfo]);
            partNumber.current.value = ""; partQuantity.current.value = "";
        } catch(err) { console.error(err) }
    }

    const submitHandler = async e => {
        try {
            e.preventDefault();
            const jobInfo = {
                status: jobStatus.current.value,
                type: type.current.value,
                dateCompleted: dateCompleted.current.value,
                invoiceNumber: invoiceNumber.current.value,
                issueNotes: issueNotes.current.value,
                repairNotes: repairNotes.current.value,
                parts: parts
            }
            const customerInfo = {
                businessName: businessName.current.value,
                contactName: contactName.current.value,
                phone: phone.current.value,
                address: {
                    street1: street1.current.value,
                    street2: street2.current.value,
                    city: city.current.value,
                    state: state.current.value,
                    zipcode: zipcode.current.value
                }
            }
            if (customerExists) {
                await editCustomer.mutate({ id: customerId, data: customerInfo});
                createJob.mutate({ customerId: customerId, ...jobInfo });
            } else {
                const newCustomer = await createCustomer.mutateAsync(customerInfo);
                createJob.mutate({ customerId: newCustomer.data._id, ...jobInfo });
            }
            setShowFormNew(false);
        } catch(err) { console.error(err) }
    };

    // MUTATIONS
    const queryClient = useQueryClient();
    const deleteJob = useMutation(id => API.deleteJob(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('jobs')
            console.log("Job deleted!")
        }
    })
    const createJob = useMutation(job => API.createJob(job), {
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
            console.log("Job created!");
        }
    });
    const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
            console.log("Customer updated!");
        }
    })
    const createCustomer = useMutation(customer => API.createCustomer(customer), {
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
            console.log("Customer created!");
        }
    })

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            if(showForm) {
                return (
                    <main>
                        <AutoCompleteSearch
                            customers={customers.data}
                            setCustomer={setCustomer}
                            setCustomerExists={setCustomerExists}
                        />
                        <ServiceForm
                            history={history}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            } else {
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
                            onClick={() => history.push('/service/new')}
                        >Create New Service Job
                        </button>
                        <JobsTable
                            jobs={data}
                            setJobId={setJobId}
                            searchTerm={searchTerm}
                            jobStatus={jobStatus}
                            statusHandler={statusHandler}
                            selectionHandler={selectionHandler}
                            deleteHandler={deleteHandler}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }
    }
}

export default ServiceHome;
