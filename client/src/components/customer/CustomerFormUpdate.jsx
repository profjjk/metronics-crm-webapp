import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import API from '../../API';
import CustomerJobsTable from "./CustomerJobsTable";
import CustomerJobEdit from "./CustomerJobEdit";
import { useCustomers} from "../../hooks";

const CustomerFormUpdate = ({ setShowFormUpdate, customerId }) => {
  const { status, data, error } = useCustomers('_id', customerId);
  const [showTable, setShowTable] = useState(true);
  const [jobId, setJobId] = useState();

  // Capture form input for customer
  let businessName = useRef(''); let contactName = useRef(''); let phone = useRef('');
  let street1 = useRef(''); let street2 = useRef(''); let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
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
    await editCustomer.mutate({id: customerId, data: customerInfo})
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
                  name="businessName"
                  placeholder={"business name"}
                  defaultValue={data.data[0].businessName || ""}
                  ref={businessName}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="contactName"
                  placeholder={"contact name"}
                  defaultValue={data.data[0].contactName || ""}
                  ref={contactName}
                />
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder={"phone #"}
                  defaultValue={data.data[0].phone || ""}
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
                  defaultValue={data.data[0].address.street1 || ""}
                  ref={street1}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="street2"
                  placeholder={"street 2"}
                  defaultValue={data.data[0].address.street2 || ""}
                  ref={street2}
                />
                <div id="address">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder={"city"}
                    defaultValue={data.data[0].address.city || ""}
                    ref={city}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="state"
                    defaultValue={data.data[0].address.state || ""}
                    ref={state}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder={"zip code"}
                    defaultValue={data.data[0].address.zipcode || ""}
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
