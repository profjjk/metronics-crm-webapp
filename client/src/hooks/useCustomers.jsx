import { useQuery } from 'react-query';
import API from '../API';

const fetchCustomers = async () => {
  const customers = await API.getAllCustomers();
  console.log('\n***** GET ALL CUSTOMERS *****')
  console.log(customers.data);
  return customers;
}

export default function useCustomers() {
  return useQuery('customers', () => fetchCustomers());
}