import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchCustomers = async (key, value) => {
    return await API.searchCustomers(key, value);
}

export default function useCustomers(key, value) {
    return useQuery(['customers', value || 'all'], () => fetchCustomers(key, value));
}