import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import API from '../../API';

const CustomerFormNew = ({ setShowFormNew }) => {
  // Capture form input for customer
  let businessName = useRef(''); let contactName = useRef(''); let phone = useRef('');
  let street1 = useRef(''); let street2 = useRef(''); let city = useRef(''); let state = useRef(''); let zipcode = useRef('');

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
              name="businessName"
              placeholder={"business name"}
              ref={businessName}
            />
            <input
              type="text"
              className="form-control my-2"
              name="contactName"
              placeholder={"contact name"}
              ref={contactName}
            />
            <input
                type="tel"
                pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                required
                className="form-control"
                name="phone"
                placeholder={"123-456-7890"}
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
              ref={street1}
            />
            <input
              type="text"
              className="form-control my-2"
              name="street2"
              placeholder={"street 2"}
              ref={street2}
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
