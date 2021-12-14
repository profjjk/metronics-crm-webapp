import { useEffect, useState } from 'react';
import { useCustomers } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHashtag, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { AutoComplete } from '../../index';
import './style.scss';

const ServiceForm = ({setShowForm, job, setJob, customer, setCustomer, submit, removeJob, removeRequest,
                         submissionType, setSubmissionType, viewRequests }) => {
    const { status, data, error } = useCustomers();
    const [matchFound, setMatchFound] = useState(null);

    useEffect(() => {
        if (status === 'success' && viewRequests) {
            const findMatch = data.data.filter(customer => {
                return job.customer.address.street1.toLowerCase() === customer.address.street1.toLowerCase() &&
                    job.customer.address.city.toLowerCase() === customer.address.city.toLowerCase()
            })
            if (findMatch.length) {
                setMatchFound(findMatch[0]);
            } else {
                setMatchFound(null);
            }
        }
    }, [])

    const useExisting = () => {
        setSubmissionType("add");
        setCustomer({
            ...customer,
            _id: matchFound._id,
            businessName: matchFound.businessName,
            address: matchFound.address
        });
        setMatchFound(null);
    }

    switch (status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
            if (matchFound) {
                return (
                    <section>
                        <div className={"use-existing-customer"}>
                            <h4>The address matches an existing customer:</h4>
                            <p className={"match"}>
                                <strong>{matchFound.businessName}</strong><br/>
                                {matchFound.address.street1} {matchFound.address.street2 ? (", " + matchFound.address.street2) : <></>}<br/>
                                {matchFound.address.city}, {matchFound.address.state} {matchFound.address.zipcode}
                            </p>
                            <div>
                                <p>Add this job to <strong>{matchFound.businessName}</strong>?</p>
                                <button onClick={useExisting}>Yes</button>
                                <button onClick={() => setMatchFound(null)}>No</button>
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
                                               defaultValue={job ? job.totalBill : 0}/>
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
                                        {!viewRequests && submissionType !== "edit" ? (
                                            <AutoComplete customer={customer} setCustomer={setCustomer} setSubmissionType={setSubmissionType} />
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
                                    setJob(null)
                                    setCustomer(null)
                                    setShowForm(false)
                                }}>
                                    Cancel
                                </button>

                                {job && job._id ? (<button className={"btn-form delete"} onClick={() => {
                                    if (viewRequests) {
                                        removeRequest(job._id)
                                    } else {
                                        removeJob(job._id);
                                    }
                                    setJob(null)
                                    setCustomer(null)
                                    setShowForm(false)
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
