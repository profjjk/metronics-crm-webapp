import { useQuery } from 'react-query';
import API from '../API';

const fetchJobs = async (key, value) => {
    const jobs = await API.searchJobs(key, value);
    const customers = await API.searchCustomers();
    const results = [];
    for (let job of jobs.data) {
        const customer = customers.data.filter(customer => customer._id === job.customerId )
        const compilation = {
            _id: job._id,
            status: job.status,
            type: job.type,
            invoiceNumber: job.invoiceNumber,
            dateCompleted: job.dateCompleted,
            issueNotes: job.issueNotes,
            repairNotes: job.repairNotes,
            parts: job.parts,
            customer: {
                businessName: customer[0].businessName,
                contactName: customer[0].contactName,
                address: customer[0].address,
                phone: customer[0].phone
            }
        }
        results.push(compilation);
    }
    return results;
}

export default function useJobs(key, value) {
    return useQuery(['jobs', value || "all"], () => fetchJobs(key, value));
}