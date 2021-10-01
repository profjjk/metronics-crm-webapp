import { useRef } from "react";
import API from "../../API";

const ServiceForm = props => {
    // TODO: Parts will not update when a new one is added. Perhaps I need a stateful variable that updates with useEffect?
    // TODO: I need to map over the variable for a job's status and type. Reference the old update form.
    // TODO: Need to include delete functionality on parts table.

    let partNumber = useRef(); let partQuantity = useRef(); let customer; let job;

    if (!props.newJob) {
        customer = [props.data[0].customer]
        job = props.data;
        props.setParts(props.data[0].parts)
    } else {
        customer = props.data;
    }

    const addPartHandler = async e => {
        try {
            e.preventDefault();
            let part = await API.searchParts('partNumber', partNumber.current.value.toUpperCase())
            const newPart = {
                partNumber: partNumber.current.value.toUpperCase(),
                description: part.data[0].description,
                quantity: parseInt(partQuantity.current.value) < 0 ? 0 : parseInt(partQuantity.current.value)
            }
            props.setParts([...props.parts, newPart]);
            partNumber.current.value = ""; partQuantity.current.value = "";
        } catch(err) { console.error(err) }
    }

    return (
        <form className="p-5" onSubmit={props.submitHandler}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
                <div className="px-3">
                    <h6>Status</h6>
                    <select className="form-select" name="status">
                        <option>Waiting</option>
                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </select>
                </div>
                <div className="px-3">
                    <h6>Type</h6>
                    <select className="form-select" name="type">
                        <option>Maintenance</option>
                        <option>Repair</option>
                        <option>Callback</option>
                        <option>Training</option>
                    </select>
                </div>
                <div className="px-3">
                    <h6>Date Completed</h6>
                    <input
                        type="date"
                        className="form-control"
                        name="dateCompleted"
                    />
                </div>
                <div className="px-3">
                    <h6>Invoice #</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="invoiceNumber"
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
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="contactName"
                        placeholder={"contact name"}
                        defaultValue={customer ? customer[0].contactName : ""}
                    />
                    <input
                        type="tel"
                        pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                        required
                        className="form-control"
                        name="phone"
                        placeholder={"123-456-7890"}
                        defaultValue={customer ? customer[0].phone : ""}
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
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="street2"
                        placeholder={"street 2"}
                        defaultValue={customer ? customer[0].address.street2 : ""}
                    />
                    <div id="address">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder={"city"}
                            defaultValue={customer ? customer[0].address.city : ""}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            placeholder={"state"}
                            defaultValue={customer ? customer[0].address.state : "CA"}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            placeholder={"zip code"}
                            defaultValue={customer ? customer[0].address.zipcode : ""}
                        />
                    </div>
                </div>
            </div>

            <div id="notes-area" className="my-3 px-3">
                <h6>Problem Description</h6>
                <textarea
                    className="form-control"
                    name="issueNotes"
                    defaultValue={job ? job[0].issueNotes : ""}
                />
                <h6 className="mt-3">Repair Notes</h6>
                <textarea
                    className="form-control"
                    name="repairNotes"
                    defaultValue={job ? job[0].repairNotes : ""}
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
                                onClick={addPartHandler}
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
                        {props.parts.map(part => (
                            <tr key={part.partNumber}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td>{part.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        data-id={part.partNumber}
                                        onClick={props.removePartHandler}
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
                    onClick={() => props.setShowForm(false)}
                    >Cancel
                </button>
            </div>
        </form>
    );
}

export default ServiceForm;