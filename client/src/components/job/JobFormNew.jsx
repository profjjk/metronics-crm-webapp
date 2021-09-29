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





  switch (jobs.status || customers.status) {
    case "loading":
      return <h4 className="text-center my-5">Loading</h4>;
    case "error":
      return <h4 className="text-center my-5">Oops, something went wrong!</h4>;
    default:
      if (customer) {
        customerId = customer[0]._id;
      }

  }
}

export default JobFormNew;
