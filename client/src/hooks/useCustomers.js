import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCustomers = async () => {
  return await axios.get('http://localhost:8080/api/customers/');
}

export default function useCustomers() {
  return useQuery('customers', () => fetchCustomers());
}