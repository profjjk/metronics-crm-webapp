import { useState } from 'react';
import useCustomers from '../hooks/useCustomers';
import { SideNavbar, Searchbar, CustomerTable, CustomerFormNew, CustomerFormUpdate } from '../components';

const Customers = () => {
  const { status, data, error, isFetching } = useCustomers();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [customerId, setCustomerId] = useState();
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormNew, setShowFormNew] = useState(false);

  switch (status) {
    case "loading":
      return <h1 className="text-center my-5">Loading</h1>;
    case "error":
      return <h4 className="text-center my-5">Error: {error.message}</h4>;
    default:
      if (!showFormNew && !showFormUpdate) {
        return (
          <main>
            <div className="p-5">
              <SideNavbar />
              <Searchbar
                heading="Customer Search"
                subheading="Search by business name, city name, or phone #"
                placeholder="Business Name, city name, or phone #"
                setSearch={setSearchTerm}
              />
              <button
                className="btn btn-success me-3 mt-5"
                onClick={() => setShowFormNew(true)}
              >
                Create New Customer
              </button>
              <CustomerTable
                setShowFormUpdate={setShowFormUpdate}
                setCustomerId={setCustomerId}
                searchTerm={searchTerm}
                customers={data.data}
              />
              {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
            </div>
          </main>
        )
      }

      if (showFormNew) {
        return (
          <main>
            <div className="p-5">
              <SideNavbar />
              <CustomerFormNew 
                setShowFormNew={setShowFormNew} 
              />
              {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
            </div>
          </main>
        )
      }

      if (showFormUpdate) {
        return (
          <main>
            <div className="p-5">
              <SideNavbar />
              <CustomerFormUpdate 
                setShowFormUpdate={setShowFormUpdate} 
                customerId={customerId}
              />
              {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
            </div>
          </main>
        )
      }
  }
}

export default Customers;
