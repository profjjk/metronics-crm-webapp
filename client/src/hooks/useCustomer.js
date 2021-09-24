import { useQuery } from 'react-query';
import API from '../API';

const fetchCustomer = customerId => {
  return API.getCustomerById(customerId);
}

export default function useCustomer(customerId) {
  return useQuery(['customer', customerId], () => fetchCustomer(customerId));
}