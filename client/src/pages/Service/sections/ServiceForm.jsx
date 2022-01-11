import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useCustomers, useData } from '../../../react-query';
import { AutoComplete } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHashtag, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import API from '../../../utils/API';

const ServiceForm = () => {
    const qc = useQueryClient();
    const { status, data, error } = useCustomers();
    const existingCustomer = useData('existingCustomer');
    const deleteReq = useData('deleteRequest');
    const submissionType = useData('submissionType');
    const customer = useData('selectedCustomer');
    const job = useData('selectedJob');
    const view = useData('view');
    const dollarUSLocale = Intl.NumberFormat('en-US');

    useEffect(() => {
        if (status === 'success' && view === 'requests') {
            const found = data.data.filter(data => {
                return customer.address.street1.toLowerCase() === data.address.street1.toLowerCase()
                    && customer.address.city.toLowerCase() === data.address.city.toLowerCase();
            })
            if (found.length > 0) qc.setQueryData('existingCustomer', found[0])
        }
    }, []);

    // DATA MUTATIONS
    const createJob = useMutation(job => API.createJob(job), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });
    const editJob = useMutation(job => API.updateJob(job.id, job.data), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });
    const deleteJob = useMutation(id => API.deleteJob(id), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });
    const createCustomer = useMutation(customer => API.createCustomer(customer), {
        onSuccess: () => {
            qc.invalidateQueries('customers');
        }
    });
    const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            qc.invalidateQueries('customers');
        }
    });
    const deleteRequest = useMutation(id => API.deleteRequest(id), {
        onSuccess: () => {
            qc.invalidateQueries('requests');
        }
    })

    // EVENT HANDLERS
    const removeJob = id => {
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.");
        if (answer) deleteJob.mutate(id);
    };
    const removeRequest = id => {
        deleteRequest.mutate(id);
    };
    const submit = async e => {
        e.preventDefault();
        try {
            const formData = Object.fromEntries(new FormData(e.target));
            const jobData = {
                status: formData.status,
                serviceDate: formData.serviceDate,
                invoiceNumber: formData.invoiceNumber.trim(),
                issueNotes: formData.issueNotes.trim(),
                serviceNotes: formData.serviceNotes.trim(),
                totalBill: parseFloat(formData.totalBill.trim()),
                isPaid: formData.isPaid === "on",
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
                if(deleteReq) {
                    removeRequest(job._id)
                    qc.setQueryData('deleteRequest', null);
                    qc.setQueryData('view', 'requests');
                    return;
                }
                qc.setQueryData('view', 'default');
                return
            }
            if (submissionType === 'edit') {
                editCustomer.mutate({ id: customer._id, data: customerData});
                editJob.mutate({ id: job._id, data: jobData });
                qc.setQueryData('view', 'default');
                return
            }
            if (submissionType === 'new') {
                const newCustomer = await createCustomer.mutateAsync(customerData);
                createJob.mutate({ customer: newCustomer.data._id, ...jobData });
                if(deleteReq) {
                    removeRequest(job._id)
                    qc.setQueryData('deleteRequest', null);
                    qc.setQueryData('view', 'requests');
                    return;
                }
                qc.setQueryData('view', 'default');
            }
        } catch(err) { console.error(err) }
    };
    const useExisting = () => {
        qc.setQueryData('submissionType', 'add');
        qc.setQueryData('selectedCustomer', {
            ...customer,
            _id: existingCustomer._id,
            businessName: existingCustomer.businessName,
            address: existingCustomer.address
        });
        qc.setQueryData('existingCustomer', null)
    }

    switch (status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
            if (existingCustomer) {
                return (
                    <section>
                        <div className={"use-existing-customer"}>
                            <h4>The address matches an existing customer:</h4>
                            <p className={"match"}>
                                <strong>{existingCustomer.businessName}</strong><br/>
                                {existingCustomer.address.street1} {existingCustomer.address.street2 ? (", " + existingCustomer.address.street2) : <></>}<br/>
                                {existingCustomer.address.city}, {existingCustomer.address.state} {existingCustomer.address.zipcode}
                            </p>
                            <div>
                                <p>Add this job to <strong>{existingCustomer.businessName}</strong>?</p>
                                <button onClick={useExisting}>Yes</button>
                                <button onClick={() => qc.setQueryData('existingCustomer', null)}>No</button>
                            </div>
                        </div>
                    </section>
                )
            } else {
                return (
                    <section>
                        <form id={"form-service"} onSubmit={submit}>
                            <div className={"job-area"}>
                                <label>
                                    Service Date
                                    <input className={"input-sm"} type={"date"} name={"serviceDate"}
                                           defaultValue={job ? job.serviceDate : ""}/>
                                </label>

                                <label>
                                    Status
                                    <div className={"dropdown"}>
                                        <FontAwesomeIcon className={"faChevronDown"} icon={faChevronDown}/>
                                        <select name={"status"}>
                                            {job ? <option>{job.status}</option> : <></>}
                                            {job && job.status === "Pending" ? "" : <option>Pending</option>}
                                            {job && job.status === "Scheduled" ? "" : <option>Scheduled</option>}
                                            {job && job.status === "Completed" ? "" : <option>Completed</option>}
                                            {job && job.status === "Canceled" ? "" : <option>Canceled</option>}
                                        </select>
                                    </div>
                                </label>

                                <label>
                                    Invoice
                                    <div className={"invoiceInput"}>
                                        <FontAwesomeIcon className={"faHashtag"} icon={faHashtag}/>
                                        <input type={"text"} name={"invoiceNumber"}
                                               defaultValue={job ? job.invoiceNumber : ""}/>
                                    </div>

                                </label>

                                <label>
                                    Total Bill
                                    <div className={"dollarInput"}>
                                        <FontAwesomeIcon className={"faDollarSign"} icon={faDollarSign}/>
                                        <input type={"text"} name={"totalBill"}
                                               defaultValue={job ? dollarUSLocale.format(job.totalBill) : "0"}/>
                                    </div>
                                </label>

                                <label className={"text-center"}>
                                    Paid?
                                    <input className={"checkbox"} type={"checkbox"} name={"isPaid"}
                                           defaultChecked={job && job.isPaid === true ? "on" : undefined}/>
                                </label>
                            </div>

                            <div className={"customer-area"}>
                                <div>
                                    <label>
                                        Contact Information
                                        {view !== 'requests' && existingCustomer ? (
                                            <AutoComplete />
                                        ) : (
                                            <input type={"text"} name={"businessName"} placeholder={"Business Name"} required
                                                   defaultValue={customer ? customer.businessName : ""}/>
                                        )}
                                        <input type={"text"} name={"contactName"} placeholder={"Contact Person"}
                                               defaultValue={customer ? customer.contactName : ""}/>
                                        <input type={"text"} name={"phone"} placeholder={"Phone #"} required
                                               defaultValue={customer ? customer.phone : ""}/>
                                    </label>
                                </div>

                                <div>
                                    <label className={"address"}>
                                        Address
                                        <input type={"text"} name={"street1"} placeholder={"Street Address"} required
                                               defaultValue={customer ? customer.address.street1 : ""}/>
                                        <input type={"text"} name={"street2"} placeholder={"Unit or Building #"}
                                               defaultValue={customer ? customer.address.street2 : ""}/>
                                        <div>
                                            <input type={"text"} name={"city"} placeholder={"City"} required
                                                   defaultValue={customer ? customer.address.city : ""}/>
                                            <input className={"text-center"} type={"text"} name={"state"} defaultValue={"CA"} required/>
                                            <input type={"text"} name={"zipcode"} placeholder={"Zip Code"} required
                                                   defaultValue={customer ? customer.address.zipcode : ""}/>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className={"notes-area"}>
                                <label>
                                    Description of Problem
                                    <textarea name={"issueNotes"} defaultValue={job ? job.issueNotes : ""}/>
                                </label>

                                <label>
                                    Service Notes
                                    <textarea name={"serviceNotes"} defaultValue={job ? job.serviceNotes : ""}/>
                                </label>
                            </div>

                            <div className={"button-area"}>
                                <button className={"btn-form"} type={"submit"}>
                                    Save
                                </button>

                                <button className={"btn-form"} onClick={() => {
                                    const location = window.location.pathname;
                                    if (location === '/customers') {
                                        qc.setQueryData('selectedJob', null);
                                        qc.setQueryData('view', 'customerForm');
                                    } else {
                                        qc.setQueryData('selectedCustomer', null);
                                        qc.setQueryData('selectedJob', null);
                                        qc.setQueryData('view', 'default');
                                    }
                                }}>
                                    Cancel
                                </button>

                                {job && job._id ? (<button className={"btn-form delete"} onClick={() => {
                                    if (view === 'requests') {
                                        removeRequest(job._id)
                                    } else {
                                        removeJob(job._id);
                                    }
                                    qc.setQueryData('selectedCustomer', null);
                                    qc.setQueryData('selectedJob', null);
                                    qc.setQueryData('view', 'default');
                                }}>
                                    Delete
                                </button>) : <></>}
                            </div>
                        </form>
                    </section>
                );
            }
    }
}

export default ServiceForm;