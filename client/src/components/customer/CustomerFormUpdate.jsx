import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import API from '../../API';
import CustomerJobsTable from "./CustomerJobsTable";
import CustomerJobEdit from "./CustomerJobEdit";
import useCustomer from '../../hooks/useCustomer';

const CustomerFormUpdate = ({ setShowFormUpdate, customerId }) => {
  const { status, data, error } = useCustomer(customerId);
  const [showTable, setShowTable] = useState(true);
  const [jobId, setJobId] = useState();

  // Capture form input for customer
  let business_name = useRef(''); let contact_name = useRef(''); let phone = useRef('');
  let street_1 = useRef(''); let street_2 = useRef(''); let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editCustomer = useMutation(customer => API.updateCustomer(customer), {
    onSuccess: () => {
      // queryClient.invalidateQueries('customers')
      queryClient.invalidateQueries(['customer', customerId])
      console.log("Customer updated!")
    }
  });

  // Event Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    const customerInfo = {
      _id: customerId,
      business_name: business_name.current.value, 
      contact_name: contact_name.current.value, 
      phone: phone.current.value, 
      street_1: street_1.current.value, 
      street_2: street_2.current.value,
      city: city.current.value, 
      state: state.current.value, 
      zipcode: zipcode.current.value
    }
    await editCustomer.mutate(customerInfo)
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
            <h1 className="text-primary text-center mb-5">Customer Info</h1>

            <div id="customer-area" className="my-3">
              <div className="px-3">
                <h6>Contact Information</h6>
                <input
                  type="text"
                  className="form-control"
                  name="business_name"
                  placeholder={"business name"}
                  defaultValue={data.data.business_name || ""}
                  ref={business_name}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="contact_name"
                  placeholder={"contact name"}
                  defaultValue={data.data.contact_name || ""}
                  ref={contact_name}
                />
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder={"phone #"}
                  defaultValue={data.data.phone || ""}
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
                  defaultValue={data.data.street_1 || ""}
                  ref={street_1}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="street_2"
                  placeholder={"street 2"}
                  defaultValue={data.data.street_2 || ""}
                  ref={street_2}
                />
                <div id="address">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder={"city"}
                    defaultValue={data.data.city || ""}
                    ref={city}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="state"
                    defaultValue={data.data.state || ""}
                    ref={state}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder={"zip code"}
                    defaultValue={data.data.zipcode || ""}
                    ref={zipcode}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 px-3">
              <button className="btn btn-primary me-3 form-btn" 
                type="submit"
                >Update
              </button>
              <button
                className="btn btn-secondary form-btn"
                onClick={() => setShowFormUpdate(false)}
                >Cancel
              </button>
            </div>
          </form>
          {showTable ? (
            <CustomerJobsTable 
              customerId={customerId}
              setShowTable={setShowTable} 
              setJobId={setJobId}
            />
          ) : ( 
            <CustomerJobEdit 
              jobId={jobId}
              setShowTable={setShowTable}
              customerId={customerId}
            />
          )}
        </>
      );
  }
}

export default CustomerFormUpdate;
