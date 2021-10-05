const DropdownSection = ({ job }) => {
    return (
        <div id="dropdown-area" className="my-3">
            <div className="px-3">
                <h6>Status</h6>
                <select className="form-select" name="status">
                    {job ? <option>{job.status}</option> : <></>}
                    {job && job.status === "Waiting" ? "" : <option>Waiting</option>}
                    {job && job.status === "Scheduled" ? "" : <option>Scheduled</option>}
                    {job && job.status === "Completed" ? "" : <option>Completed</option>}
                    {job && job.status === "Canceled" ? "" : <option>Canceled</option>}
                </select>
            </div>
            <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type">
                    {job ? <option>{job.type}</option> : <></>}
                    {job && job.type === "Maintenance" ? "" : <option>Maintenance</option>}
                    {job && job.type === "Repair" ? "" : <option>Repair</option>}
                    {job && job.type === "Callback" ? "" : <option>Callback</option>}
                    {job && job.type === "Training" ? "" : <option>Training</option>}
                </select>
            </div>
            <div className="px-3">
                <h6>Date Completed</h6>
                <input
                    type="date"
                    className="form-control"
                    name="serviceDate"
                    defaultValue={job ? job.serviceDate : ""}
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
    )
}

export default DropdownSection;