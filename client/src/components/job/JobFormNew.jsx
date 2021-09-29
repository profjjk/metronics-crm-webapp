import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useJobs, useCustomers } from '../../hooks';
import AutoCompleteSearch from "./AutoCompleteSearch";
import API from '../../API';

const JobFormNew = ({ setShowFormNew }) => {
  const customers = useCustomers()
  const jobs = useJobs();
  const [customer, setCustomer] = useState();
  const [parts, setParts] = useState([]);
  const [customerExists, setCustomerExists] = useState(false);

  // Capture form input for job
  let jobStatus = useRef(''); let type = useRef(''); let dateCompleted = useRef(''); 
  let invoiceNumber = useRef(''); let issueNotes = useRef(''); let repairNotes = useRef('');

  // Capture form input for parts
  let partNumber = useRef(''); let partQuantity = useRef('');

  // Capture form input for customer
  let customerId; let businessName = useRef(''); let contactName = useRef(''); 
  let phone = useRef(''); let street1 = useRef(''); let street2 = useRef(''); 
  let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
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

  // Event Handlers
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

  switch (jobs.status || customers.status) {
    case "loading":
      return <h4 className="text-center my-5">Loading</h4>;
    case "error":
      return <h4 className="text-center my-5">Oops, something went wrong!</h4>;
    default:
      if (customer) {
        customerId = customer[0]._id;
      }
      return (
        <>
          <AutoCompleteSearch 
            customers={customers.data}
            setCustomer={setCustomer}
            setCustomerExists={setCustomerExists}
          />

          <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
              <div className="px-3">
                <h6>Status</h6>
                <select className="form-select" name="status" ref={jobStatus}>
                  <option>Waiting</option>}<option>Scheduled</option>}
                  <option>Completed</option>}<option>Canceled</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type" ref={type}>
                  <option>Maintenance</option>}<option>Repair</option>}
                  <option>Callback</option>}<option>Training</option>}
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
                onClick={() => setShowFormNew(false)}
                >Cancel
              </button>
            </div>
          </form>
        </>
      );
  }
}

export default JobFormNew;
