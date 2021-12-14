import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "../../hooks";
import { JobsTable, ServiceForm, SideNavbar } from "../../components";
import API from "../../utils/API";
import './style.scss';

// TODO:
//  - BUG: Query cache not refetching from database after saving new job. Invalidating queries not working? Only refreshes on page reload.
//  - Need a mutation to delete Requests by id when converting them to saved jobs.

const ServiceHome = () => {
    const { user } = useUser();

    const [showForm, setShowForm] = useState(false);

    const [submissionType, setSubmissionType] = useState('new');
    const [viewRequests, setViewRequests] = useState(false);

    const [job, setJob] = useState();
    const [parts, setParts] = useState([]);
    const [customer, setCustomer] = useState();

    // DATA MUTATIONS
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

    // EVENT HANDLERS
    const selectJob = job => {
        setJob(job);
        setCustomer(job.customer)
        setParts(job.parts)
        setShowForm(true);
    };
    const removeJob = id => {
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) {
            setParts([])
            deleteJob.mutate(id)
        }
    };
    const removePart = e => {
        e.preventDefault();
        setParts(parts.filter(part => part.partNumber !== e.target.dataset.id));
    };
    const testSubmit = e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData)
    }
    const submit = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const jobData = {
                status: formData.status,
                serviceDate: formData.serviceDate,
                invoiceNumber: formData.invoiceNumber.trim(),
                issueNotes: formData.issueNotes.trim(),
                serviceNotes: formData.serviceNotes.trim(),
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
            if (submissionType === 'add') {
                editCustomer.mutate({ id: customer._id, data: customerData});
                createJob.mutate({ customer: customer._id, ...jobData });
                setShowForm(false);
                return
            }
            if (submissionType === 'edit') {
                editCustomer.mutate({ id: customer._id, data: customerData});
                editJob.mutate({ id: job._id, data: jobData });
                setShowForm(false);
                return
            }
            if (submissionType === 'new') {
                const newCustomer = await createCustomer.mutateAsync(customerData);
                createJob.mutate({ customer: newCustomer.data._id, ...jobData });
                setShowForm(false);
            }
        } catch(err) { console.error(err) }
    };

    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Service Jobs</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => {
                        setViewRequests(false);
                        setShowForm(false);
                    }}>View All</p>

                    <p className={"btn"} onClick={() => {
                        setShowForm(false);
                        setViewRequests(true);
                    }}>View Online Requests</p>

                    <p className={"btn"} onClick={() => {
                        setShowForm(false);
                        setViewRequests(false);
                    }}>View Unpaid</p>

                    <p className={"btn"} onClick={() => {
                        setSubmissionType("new")
                        setViewRequests(false)
                        setJob(null);
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
                    <SideNavbar/>
                </header>

                <main className={"container"}>
                    <Header />

                    <JobsTable
                        selectJob={selectJob}
                        viewRequests={viewRequests}
                        setSubmissionType={setSubmissionType}
                    />
                </main>
            </>
        )
    }
    if (showForm) {
        return (
            <>
                <header>
                    <SideNavbar/>
                </header>

                <main className={"container"}>
                    <Header />

                    <ServiceForm
                        submit={submit}
                        setShowForm={setShowForm}
                        submissionType={submissionType}
                        setSubmissionType={setSubmissionType}
                        viewRequests={viewRequests}
                        setViewRequests={setViewRequests}
                        job={job}
                        setJob={setJob}
                        customer={customer}
                        setCustomer={setCustomer}
                        removeJob={removeJob}
                    />
                </main>
            </>
        )
    }
}

export default ServiceHome;
