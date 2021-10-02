import { useState, useEffect } from "react";

const CustomersTable = ({ selectionHandler, deleteHandler, searchTerm, customers }) => {
  const [customerList, setCustomerList] = useState(customers);
  const headers = ["Business Name", "Address", "Phone #", "Contact Name"];

  // Search for customers
  useEffect(() => {
    if (searchTerm === "") {
      setCustomerList(customers);
      return;
    }
    setCustomerList(
      customers.filter(customer => {
        if (customer.businessName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        } else if (customer.address.city !== null && customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        } else if (customer.phone !== null && customer.phone.includes(searchTerm)) {
          return true;
        }
        return false;
      })
    );
  }, [searchTerm, customers]);

  return (
    <div className="mt-5">
      <h3 className="float-start">Customer Search Results:</h3>
      <table className="table">
        <thead>
          <tr>
              {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
              <td />
          </tr>
        </thead>

        <tbody>
          {customerList.map(customer => (
            <tr key={customer._id}>
              <td>{customer.businessName}</td>
              <td>
                {customer.address.street1}
                {customer.address.street2 !== "" ? ", " + customer.address.street2 : ""}
                <br />
                {customer.address.city}, {customer.address.state} {customer.address.zipcode}
              </td>
              <td>{customer.phone}</td>
              <td>{customer.contactName}</td>
              <td>
                <div className="float-end">
                  <button
                    className="btn btn-warning"
                    data-id={customer._id}
                    onClick={selectionHandler}
                    >view
                  </button>
                  <button
                    className="btn btn-danger ms-4"
                    data-id={customer._id}
                    onClick={deleteHandler}
                    >X
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;
