import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import API from '../../API';

const CustomerFormNew = ({ setShowFormNew }) => {
  // Capture form input for customer
  let business_name = useRef(''); let contact_name = useRef(''); let phone = useRef('');
  let street_1 = useRef(''); let street_2 = useRef(''); let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const createCustomer = useMutation(customer => API.createCustomer(customer), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
      console.log("Customer created!")
    }
  });

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
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
    await createCustomer.mutate(customerInfo)
    setShowFormNew(false);
  };

  return (
    <>
      <form className="p-5" onSubmit={handleSubmit}>
        <h1 className="text-primary text-center mb-5">New Customer Form</h1>

        <div id="customer-area" className="my-3">
          <div className="px-3">
            <h6>Contact Information</h6>
            <input
              type="text"
              className="form-control"
              name="business_name"
              placeholder={"business name"}
              ref={business_name}
            />
            <input
              type="text"
              className="form-control my-2"
              name="contact_name"
              placeholder={"contact name"}
              ref={contact_name}
            />
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder={"phone #"}
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
              ref={street_1}
            />
            <input
              type="text"
              className="form-control my-2"
              name="street_2"
              placeholder={"street 2"}
              ref={street_2}
            />
            <div id="address">
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder={"city"}
                ref={city}
              />
              <input
                type="text"
                className="form-control"
                name="state"
                placeholder="state"
                defaultValue="CA"
                ref={state}
              />
              <input
                type="text"
                className="form-control"
                name="zipcode"
                placeholder={"zip code"}
                ref={zipcode}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 px-3">
          <button className="btn btn-primary me-3 form-btn" 
            type="submit"
            >Save
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

export default CustomerFormNew;
