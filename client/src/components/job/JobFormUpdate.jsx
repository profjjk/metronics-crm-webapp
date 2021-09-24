import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import useJob from '../../hooks/useJob';
import API from '../../API';

const JobFormUpdate = ({ jobId, setShowFormUpdate }) => {
  const { status, data, error } = useJob(jobId);

  // Capture form input for job
  let jobStatus = useRef(''); let type = useRef(''); let date_completed = useRef(''); 
  let invoice_number = useRef(''); let issue_notes = useRef(''); let repair_notes = useRef('');
  
  // Capture form input for customer
  let customer_id; let business_name = useRef(''); let contact_name = useRef(''); let phone = useRef('');
  let street_1 = useRef(''); let street_2 = useRef(''); let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editJob = useMutation(job => API.updateJob(job), {
    onSuccess: () => {
      queryClient.invalidateQueries('jobs')
      queryClient.invalidateQueries(['job', jobId])
      console.log("Job updated!")
    }
  });
  const editCustomer = useMutation(customer => API.updateCustomer(customer), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
      queryClient.invalidateQueries(['customer', customer_id])
      console.log("Customer updated!")
    }
  })

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    
    const jobInfo = {
      _id: jobId,
      customer_id: customer_id, 
      status: jobStatus.current.value, 
      type: type.current.value, 
      date_completed: date_completed.current.value, 
      invoice_number: invoice_number.current.value, 
      issue_notes: issue_notes.current.value, 
      repair_notes: repair_notes.current.value
    }
    const customerInfo = {
      _id: customer_id,
      business_name: business_name.current.value, 
      contact_name: contact_name.current.value, 
      phone: phone.current.value, 
      street_1: street_1.current.value, 
      street_2: street_2.current.value,
      city: city.current.value, 
      state: state.current.value, 
      zipcode: zipcode.current.value
    }

    await editJob.mutate(jobInfo);
    await editCustomer.mutate(customerInfo)

    setShowFormUpdate(false);
  };

  switch (status) {
    case "loading":
      return <h4 className="text-center my-5">Loading</h4>;
    case "error":
      return <h4 className="text-center my-5">Error: {error.message}</h4>;
    default:
      customer_id = data.data.customer_id

      return (
        <>
          <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
              <div className="px-3">
                <h6>Status</h6>
                <select className="form-select" name="status" ref={jobStatus}>
                  <option>{data.data.status}</option>
                  {data.data.status === "waiting" ? "" : <option>waiting</option>}
                  {data.data.status === "scheduled" ? "" : <option>scheduled</option>}
                  {data.data.status === "completed" ? "" : <option>completed</option>}
                  {data.data.status === "canceled" ? "" : <option>canceled</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type" ref={type}>
                  <option>{data.data.type}</option>
                  {data.data.type === "maintenance" ? "" : <option>maintenance</option>}
                  {data.data.type === "repair" ? "" : <option>repair</option>}
                  {data.data.type === "callback" ? "" : <option>callback</option>}
                  {data.data.type === "training" ? "" : <option>training</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Date Completed</h6>
                <input
                  type="text"
                  className="form-control"
                  name="date_completed"
                  defaultValue={data.data.date_completed || ""}
                  ref={date_completed}
                />
              </div>
              <div className="px-3">
                <h6>Invoice #</h6>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_number"
                  defaultValue={data.data.invoice_number || ""}
                  ref={invoice_number}
                />
              </div>
            </div>

            <div id="customer-area" className="my-3">
              <div className="px-3">
                <h6>Contact Information</h6>
                <input
                  type="text"
                  className="form-control"
                  name="business_name"
                  placeholder={"business name"}
                  defaultValue={data.data.customer.business_name || ""}
                  ref={business_name}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="contact_name"
                  placeholder={"contact name"}
                  defaultValue={data.data.customer.contact_name || ""}
                  ref={contact_name}
                />
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder={"phone #"}
                  defaultValue={data.data.customer.phone || ""}
                  ref={phone}
                />
              </div>
              <div className="px-3">
                <h6>Address</h6>
                <input
                  type="text"
                  className="form-control"
                  name="street_1"
                  placeholder={"street 1"}
                  defaultValue={data.data.customer.street_1 || ""}
                  ref={street_1}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="street_2"
                  placeholder={"street 2"}
                  defaultValue={data.data.customer.street_2 || ""}
                  ref={street_2}
                />
                <div id="address">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder={"city"}
                    defaultValue={data.data.customer.city || ""}
                    ref={city}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder={"state"}
                    defaultValue={data.data.customer.state || ""}
                    ref={state}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder={"zip code"}
                    defaultValue={data.data.customer.zipcode || ""}
                    ref={zipcode}
                  />
                </div>
              </div>
            </div>

            <div id="notes-area" className="my-3 px-3">
              <h6>Problem Description</h6>
              <textarea
                className="form-control"
                name="issue_notes"
                defaultValue={data.data.issue_notes || ""}
                ref={issue_notes}
              />
              <h6 className="mt-3">Repair Notes</h6>
              <textarea
                className="form-control"
                name="repair_notes"
                defaultValue={data.data.repair_notes || ""}
                ref={repair_notes}
              />
            </div>

            <div className="mt-4 px-3">
              <button className="btn btn-primary me-3 form-btn" type="submit">
                Save
              </button>
              <button className="btn btn-secondary form-btn"
                onClick={() => setShowFormUpdate(false)}
                >Cancel
              </button>
            </div>
          </form>

          {/* <div id="parts-area" className="mt-5 p-5">
              <div>
                <h6 className="px-3">Add any parts that you used:</h6>
                <div className="part-form px-3">
                  <input className="form-control" placeholder="Part #" name="partNumber" />
                  <input className="form-control" type="number" placeholder="Quantity" name="partQuantity" />
                  <div><button className="btn btn-success">Add</button></div>
                </div>
              </div>
              <div>
                <h6>List of parts used:</h6>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Part #</th>
                      <th>Description</th>
                      <th># Used</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>sdfasd</td>
                      <td>asfsd</td>
                      <td>asdfas</td>
                      <td><button className="btn btn-warning">X</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
        </>
      );
  }
}

export default JobFormUpdate;
