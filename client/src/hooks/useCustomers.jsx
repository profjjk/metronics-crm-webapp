import { useQuery } from 'react-query';
import API from '../API';

const fetchCustomers = async (key, value) => {
    const customers = await API.searchCustomers(key, value);
    console.log('CUSTOMER SEARCH RESULTS:\n', customers.data);
    return customers;
}

export default function useCustomers(key, value) {
    return useQuery(['customers'], () => fetchCustomers(key, value));
}