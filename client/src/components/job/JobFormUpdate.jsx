import {useEffect, useRef, useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import { useJobs } from '../../hooks';
import API from '../../API';

const JobFormUpdate = ({ jobId, setShowFormUpdate }) => {
  const { status, data, error } = useJobs('_id', jobId);
  const [parts, setParts] = useState([]);

  // useEffect(() => {
  //     setParts([...data[0].parts]);
  // }, []);

  // Capture form input for job
  let jobStatus = useRef(''); let type = useRef(''); let dateCompleted = useRef(''); 
  let invoiceNumber = useRef(''); let issueNotes = useRef(''); let repairNotes = useRef('');

  // Capture form input for parts
  let partNumber = useRef(''); let partQuantity = useRef('');

  // Capture form input for customer
  let businessName = useRef(''); let contactName = useRef('');
  let phone = useRef(''); let street1 = useRef(''); let street2 = useRef('');
  let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editJob = useMutation(job => API.updateJob(job.id, job.data), {
    onSuccess: () => {
      queryClient.invalidateQueries('jobs')
      console.log("Job updated!")
    }
  });
  const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data[0]), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
      console.log("Customer updated!")
    }
  })

  // Handlers
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

  const handleSubmit = async e => {
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

    await editJob.mutate({ id: data[0]._id, data: jobInfo });
    await editCustomer.mutate({ id: data[0].customerId, data: customerInfo })

    setShowFormUpdate(false);
  };

  switch (status) {
    case "loading":
      return <h4 className="text-center my-5">Loading</h4>;
    case "error":
      return <h4 className="text-center my-5">Error: {error.message}</h4>;
    default:
      return (
        <>
          <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
              <div className="px-3">
                <h6>Status</h6>
                <select className="form-select" name="status" ref={jobStatus}>
                  <option>{data[0].status}</option>
                  {data[0].status === "waiting" ? "" : <option>waiting</option>}
                  {data[0].status === "scheduled" ? "" : <option>scheduled</option>}
                  {data[0].status === "completed" ? "" : <option>completed</option>}
                  {data[0].status === "canceled" ? "" : <option>canceled</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type" ref={type}>
                  <option>{data[0].type}</option>
                  {data[0].type === "maintenance" ? "" : <option>maintenance</option>}
                  {data[0].type === "repair" ? "" : <option>repair</option>}
                  {data[0].type === "callback" ? "" : <option>callback</option>}
                  {data[0].type === "training" ? "" : <option>training</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Date Completed</h6>
                <input
                  type="text"
                  className="form-control"
                  name="dateCompleted"
                  defaultValue={data[0].dateCompleted || ""}
                  ref={dateCompleted}
                />
              </div>
              <div className="px-3">
                <h6>Invoice #</h6>
                <input
                  type="text"
                  className="form-control"
                  name="invoiceNumber"
                  defaultValue={data[0].invoiceNumber || ""}
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
                  defaultValue={data[0].customer.businessName || ""}
                  ref={businessName}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="contactName"
                  placeholder={"contact name"}
                  defaultValue={data[0].customer.contactName || ""}
                  ref={contactName}
                />
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder={"phone #"}
                  defaultValue={data[0].customer.phone || ""}
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
                  defaultValue={data[0].customer.address.street1 || ""}
                  ref={street1}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="street2"
                  placeholder={"street 2"}
                  defaultValue={data[0].customer.address.street2 || ""}
                  ref={street2}
                />
                <div id="address">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder={"city"}
                    defaultValue={data[0].customer.address.city || ""}
                    ref={city}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder={"state"}
                    defaultValue={data[0].customer.address.state || ""}
                    ref={state}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder={"zip code"}
                    defaultValue={data[0].customer.address.zipcode || ""}
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
                defaultValue={data[0].issueNotes || ""}
                ref={issueNotes}
              />
              <h6 className="mt-3">Repair Notes</h6>
              <textarea
                className="form-control"
                name="repairNotes"
                defaultValue={data[0].repairNotes || ""}
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
                  {data[0].parts.map(part => (
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
                Update
              </button>
              <button className="btn btn-secondary form-btn"
                onClick={() => setShowFormUpdate(false)}
                >Cancel
              </button>
            </div>
          </form>
        </>
      );
  }
}

export default JobFormUpdate;
