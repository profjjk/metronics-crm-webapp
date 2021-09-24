import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCustomer = async customerId => {
  return await axios.get(`http://localhost:8080/api/customers/${customerId}`);
}

export default function useCustomer(customerId) {
  return useQuery(['customer', customerId], () => fetchCustomer(customerId));
}