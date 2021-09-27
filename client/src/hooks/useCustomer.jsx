import { useQuery } from 'react-query';
import API from '../API';

const fetchCustomerById = async id => {
    const customer = await API.getCustomerById(id);
    console.log('\n***** GET CUSTOMER BY ID *****')
    console.log(customer.data);
    return customer;
}

export default function useCustomer(id) {
    return useQuery(['customer', id], () => fetchCustomerById(id));
}