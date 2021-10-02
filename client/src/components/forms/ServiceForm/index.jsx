import { useRef } from "react";
import API from "../../../utils/API";

const ServiceForm = ({ customer, job, parts, setParts, submitHandler, removePartHandler, setShowForm }) => {
    let partNumber = useRef(); let partQuantity = useRef();

    const addPartHandler = async e => {
        try {
            e.preventDefault();
            let part = await API.searchParts('partNumber', partNumber.current.value.toUpperCase())
            const newPart = {
                partNumber: partNumber.current.value.toUpperCase(),
                description: part.data[0].description,
                quantity: parseInt(partQuantity.current.value) < 0 ? 0 : parseInt(partQuantity.current.value)
            }
            setParts([...parts, newPart]);
            partNumber.current.value = ""; partQuantity.current.value = "";
        } catch(err) { console.error(err) }
    }

    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
                <div className="px-3">
                    <h6>Status</h6>
                    <select className="form-select" name="status">
                        <option>{job.status}</option>
                        {job.status === "Waiting" ? "" : <option>Waiting</option>}
                        {job.status === "Scheduled" ? "" : <option>Scheduled</option>}
                        {job.status === "Completed" ? "" : <option>Completed</option>}
                        {job.status === "Canceled" ? "" : <option>Canceled</option>}
                    </select>
                </div>
                <div className="px-3">
                    <h6>Type</h6>
                    <select className="form-select" name="type">
                        <option>{job.type}</option>
                        {job.type === "Maintenance" ? "" : <option>Maintenance</option>}
                        {job.type === "Repair" ? "" : <option>Repair</option>}
                        {job.type === "Callback" ? "" : <option>Callback</option>}
                        {job.type === "Training" ? "" : <option>Training</option>}
                    </select>
                </div>
                <div className="px-3">
                    <h6>Date Completed</h6>
                    <input
                        type="date"
                        className="form-control"
                        name="dateCompleted"
                        defaultValue={job ? job.dateCompleted : ""}
                    />
                </div>
                <div className="px-3">
                    <h6>Invoice #</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="invoiceNumber"
                        defaultValue={job ? job.invoiceNumber : ""}
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
                        defaultValue={customer ? customer.businessName : ""}
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="contactName"
                        placeholder={"contact name"}
                        defaultValue={customer ? customer.contactName : ""}
                    />
                    <input
                        type="tel"
                        pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                        required
                        className="form-control"
                        name="phone"
                        placeholder={"123-456-7890"}
                        defaultValue={customer ? customer.phone : ""}
                    />
                </div>

                <div className="px-3">
                    <h6>Address</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="street1"
                        placeholder={"street 1"}
                        defaultValue={customer ? customer.address.street1 : ""}
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="street2"
                        placeholder={"street 2"}
                        defaultValue={customer ? customer.address.street2 : ""}
                    />
                    <div id="address">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder={"city"}
                            defaultValue={customer ? customer.address.city : ""}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            placeholder={"state"}
                            defaultValue={customer ? customer.address.state : "CA"}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            placeholder={"zip code"}
                            defaultValue={customer ? customer.address.zipcode : ""}
                        />
                    </div>
                </div>
            </div>

            <div id="notes-area" className="my-3 px-3">
                <h6>Problem Description</h6>
                <textarea
                    className="form-control"
                    name="issueNotes"
                    defaultValue={job ? job.issueNotes : ""}
                />
                <h6 className="mt-3">Repair Notes</h6>
                <textarea
                    className="form-control"
                    name="repairNotes"
                    defaultValue={job ? job.repairNotes : ""}
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
                        {parts.map(part => (
                            <tr key={part.partNumber}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td>{part.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        data-id={part.partNumber}
                                        onClick={removePartHandler}
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
                    onClick={() => setShowForm(false)}
                    >Cancel
                </button>
            </div>
        </form>
    );
}

export default ServiceForm;
