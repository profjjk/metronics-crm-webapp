// import { useMutation, useQueryClient } from "react-query";
// import API from "./API";
//
// const queryClient = useQueryClient();
//
// // CUSTOMER
// export const createCustomer = useMutation(customer => API.createCustomer(customer), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('customers');
//     }
// });
// export const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('customers');
//         queryClient.invalidateQueries('jobs');
//     }
// });
// export const deleteCustomer = useMutation(id => API.deleteCustomer(id), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('customers');
//     },
// });
//
// // SERVICE
// export const createJob = useMutation(job => API.createJob(job), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('jobs');
//     }
// });
// export const editJob = useMutation(job => API.updateJob(job.id, job.data), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('jobs');
//     }
// });
//  export const deleteJob = useMutation(id => API.deleteJob(id), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('jobs');
//     }
// });
// export const deleteJobs = useMutation(id => API.deleteJobsByCustomerId(id), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('jobs');
//     }
// });
//
// // INVENTORY
// export const createPart = useMutation(part => API.createPart(part), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('parts')
//     }
// });
// export const updatePart = useMutation(part => API.updatePart(part.id, part.data), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('parts')
//     }
// })
// export const deletePart = useMutation(id => API.deletePart(id), {
//     onSuccess: () => {
//         queryClient.invalidateQueries('parts')
//     }
// })