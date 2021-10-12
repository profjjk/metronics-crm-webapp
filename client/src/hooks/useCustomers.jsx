import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchCustomers = async (key, value) => {
    try {
        return await API.searchCustomers(key, value);
    } catch(err) { console.error(err.message) }
}

const useCustomers = (key, value) => {
    return useQuery('customers', () => fetchCustomers(key, value));
}

export default useCustomers;