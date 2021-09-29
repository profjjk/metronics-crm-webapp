import { useRef } from "react";

const ServiceForm = ({ handleSubmit, deleteHandler, setJobInfo, setPartInfo, setCustomerInfo }) => {

    // Capture form input for job
    let jobStatus = useRef(''); let type = useRef(''); let dateCompleted = useRef('');
    let invoiceNumber = useRef(''); let issueNotes = useRef(''); let repairNotes = useRef('');

    // Capture form input for parts
    let partNumber = useRef(''); let partQuantity = useRef('');

    // Capture form input for customer
    let customerId; let businessName = useRef(''); let contactName = useRef('');
    let phone = useRef(''); let street1 = useRef(''); let street2 = useRef('');
    let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

    return (
        <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
                <div className="px-3">
                    <h6>Status</h6>
                    <select className="form-select" name="status" ref={jobStatus}>
                        <option>Waiting</option>
                        }
                        <option>Scheduled</option>
                        }
                        <option>Completed</option>}
                        <option>Canceled</option>
                        }
                    </select>
                </div>
                <div className="px-3">
                    <h6>Type</h6>
                    <select className="form-select" name="type" ref={type}>
                        <option>Maintenance</option>
                        }
                        <option>Repair</option>
                        }
                        <option>Callback</option>}
                        <option>Training</option>
                        }
                    </select>
                </div>
                <div className="px-3">
                    <h6>Date Completed</h6>
                    <input
                        type="date"
                        className="form-control"
                        name="dateCompleted"
                        ref={dateCompleted}
                    />
                </div>
                <div className="px-3">
                    <h6>Invoice #</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="invoiceNumber"
                        ref={invoiceNumber}
                    />
                </div>
            </div>

            <div id="customer-area" className="my-3">
                <div className="px-3">
                    <h6>Contact Information</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="businessName"
                        placeholder={"business name"}
                        defaultValue={customer ? customer[0].businessName : ""}
                        ref={businessName}
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="contactName"
                        placeholder={"contact name"}
                        defaultValue={customer ? customer[0].contactName : ""}
                        ref={contactName}
                    />
                    <input
                        type="tel"
                        pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                        required
                        className="form-control"
                        name="phone"
                        placeholder={"123-456-7890"}
                        defaultValue={customer ? customer[0].phone : ""}
                        ref={phone}
                    />
                </div>

                <div className="px-3">
                    <h6>Address</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="street1"
                        placeholder={"street 1"}
                        defaultValue={customer ? customer[0].address.street1 : ""}
                        ref={street1}
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="street2"
                        placeholder={"street 2"}
                        defaultValue={customer ? customer[0].address.street2 : ""}
                        ref={street2}
                    />
                    <div id="address">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder={"city"}
                            defaultValue={customer ? customer[0].address.city : ""}
                            ref={city}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            placeholder={"state"}
                            defaultValue={customer ? customer[0].address.state : "CA"}
                            ref={state}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            placeholder={"zip code"}
                            defaultValue={customer ? customer[0].address.zipcode : ""}
                            ref={zipcode}
                        />
                    </div>
                </div>
            </div>

            <div id="notes-area" className="my-3 px-3">
                <h6>Problem Description</h6>
                <textarea
                    className="form-control"
                    name="issueNotes"
                    ref={issueNotes}
                />
                <h6 className="mt-3">Repair Notes</h6>
                <textarea
                    className="form-control"
                    name="repairNotes"
                    ref={repairNotes}
                />
            </div>

            <div id={"parts-area"} className={"my-3 px-3"}>
                <div>
                    <h6 className="">Add any parts that you used:</h6>
                    <div className="part-form">
                        <input
                            className="form-control"
                            placeholder="Part #"
                            name="partNumber"
                            ref={partNumber}
                        />
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Quantity"
                            name="partQuantity"
                            ref={partQuantity}
                        />
                        <div>
                            <button
                                className="btn btn-success"
                                onClick={partHandler}
                            >Add
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Part #</th>
                            <th>Description</th>
                            <th># Used</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {parts.map(part => (
                            <tr key={part.partNumber}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td>{part.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        data-id={part.partNumber}
                                        onClick={deleteHandler}
                                    >X
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 px-3">
                <button className="btn btn-primary me-3 form-btn" type="submit">
                    Save
                </button>
                <button
                    className="btn btn-secondary form-btn"
                    onClick={() => history.goBack()}
                >Cancel
                </button>
            </div>
        </form>
    );
}

export default ServiceForm;