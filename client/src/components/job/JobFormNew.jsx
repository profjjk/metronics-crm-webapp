import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useCustomers from '../../hooks/useCustomers';
import AutoCompleteSearch from "./AutoCompleteSearch";
import API from '../../API';

const JobFormNew = ({ setShowFormNew }) => {
  const { status, data, error } = useCustomers();
  const [customer, setCustomer] = useState();
  const [customerExists, setCustomerExists] = useState(false);

  // Capture form input for job
  let jobStatus = useRef(''); let type = useRef(''); let date_completed = useRef(''); 
  let invoice_number = useRef(''); let issue_notes = useRef(''); let repair_notes = useRef('');

  // Capture form input for customer
  let customer_id; let business_name = useRef(''); let contact_name = useRef(''); let phone = useRef('');
  let street_1 = useRef(''); let street_2 = useRef(''); let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const createJob = useMutation(job => API.createJob(job), {
    onSuccess: () => {
      queryClient.invalidateQueries('jobs')
      console.log("Job created!")
    }
  });
  const editCustomer = useMutation(customer => API.updateCustomer(customer), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
      queryClient.invalidateQueries(['customer', customer_id])
      console.log("Customer updated!")
    }
  })
  const createCustomer = useMutation(customer => API.createCustomer(customer), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
      console.log("Customer created!")
    }
  });

  // Event Handlers
  const handleSubmit = async e => {
    e.preventDefault();

    const jobInfo = {
      status: jobStatus.current.value, 
      type: type.current.value, 
      date_completed: date_completed.current.value, 
      invoice_number: invoice_number.current.value, 
      issue_notes: issue_notes.current.value, 
      repair_notes: repair_notes.current.value
    }

    const customerInfo = {
      business_name: business_name.current.value, 
      contact_name: contact_name.current.value, 
      phone: phone.current.value, 
      street_1: street_1.current.value, 
      street_2: street_2.current.value,
      city: city.current.value, 
      state: state.current.value, 
      zipcode: zipcode.current.value
    }

    if (customerExists) {
      await editCustomer.mutate({ _id: customer[0]._id, ...customerInfo });
      await createJob.mutate({ customer_id: customer[0]._id, ...jobInfo });
    } else {
      let newCustomer = await createCustomer.mutate(customerInfo)
      await createJob.mutate({ customer_id: newCustomer._id, ...jobInfo })
    }
    
    setShowFormNew(false);
  };

  switch (status) {
    case "loading":
      return <h4 className="text-center my-5">Loading</h4>;
    case "error":
      return <h4 className="text-center my-5">Error: {error.message}</h4>;
    default:
      if (customer) {
        customer_id = customer[0]._id;
      }
      return (
        <>
          <AutoCompleteSearch 
            customers={data.data}
            setCustomer={setCustomer}
            setCustomerExists={setCustomerExists}
          />

          <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <div id="dropdown-area" className="my-3">
              <div className="px-3">
                <h6>Status</h6>
                <select className="form-select" name="status" ref={jobStatus}>
                  <option>waiting</option>}<option>scheduled</option>}
                  <option>completed</option>}<option>canceled</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type" ref={type}>
                  <option>maintenance</option>}<option>repair</option>}
                  <option>callback</option>}<option>training</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Date Completed</h6>
                <input
                  type="date"
                  className="form-control"
                  name="date_completed"
                  ref={date_completed}
                />
              </div>
              <div className="px-3">
                <h6>Invoice #</h6>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_number"
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
                  defaultValue={customer ? customer[0].business_name : ""}
                  ref={business_name}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="contact_name"
                  placeholder={"contact name"}
                  defaultValue={customer ? customer[0].contact_name : ""}
                  ref={contact_name}
                />
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder={"phone #"}
                  defaultValue={customer ? customer[0].phone : ""}
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
                  defaultValue={customer ? customer[0].street_1 : ""}
                  ref={street_1}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="street_2"
                  placeholder={"street 2"}
                  defaultValue={customer ? customer[0].street_2 : ""}
                  ref={street_2}
                />
                <div id="address">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder={"city"}
                    defaultValue={customer ? customer[0].city : ""}
                    ref={city}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder={"state"}
                    defaultValue={customer ? customer[0].state : ""}
                    ref={state}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder={"zip code"}
                    defaultValue={customer ? customer[0].zipcode : ""}
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
                ref={issue_notes}
              />
              <h6 className="mt-3">Repair Notes</h6>
              <textarea
                className="form-control"
                name="repair_notes"
                ref={repair_notes}
              />
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
