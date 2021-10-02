import axios from 'axios';

const customerUrl = 'http://localhost:8080/api/customers';
const jobUrl = 'http://localhost:8080/api/jobs'
const partUrl = 'http://localhost:8080/api/parts';

const API = {

  // CUSTOMERS
  searchCustomers(key, value) {
    return axios.get(`${customerUrl}?${key}=${value}`);
  },
  createCustomer(data) {
    return axios.post(customerUrl, data);
  },
  updateCustomer(id, data) {
    return axios.put(`${customerUrl}/${id}`, data);
  },
  deleteCustomer(id) {
    return axios.delete(`${customerUrl}/${id}`);
  },

  // JOBS
  searchJobs(key, value) {
    return axios.get(`${jobUrl}?${key}=${value}`)
  },
  createJob(data) {
    return axios.post(jobUrl, data);
  },
  updateJob(id, data) {
    console.log(data)
    return axios.put(`${jobUrl}/${id}`, data);
  },
  deleteJob(id) {
    return axios.delete(`${jobUrl}/${id}`);
  },
  deleteJobsByCustomerId(id) {
    return axios.delete(`${jobUrl}/many/${id}`);
  },

  // PARTS
  searchParts(key, value) {
    return axios.get(`${partUrl}?${key}=${value}`);
  },
  createPart(data) {
    return axios.post(partUrl, data);
  },
  updatePart(id, data) {
    return axios.put(`${partUrl}/${id}`, data);
  },
  deletePart(id) {
    return axios.delete(`${partUrl}/${id}`);
  }
}

export default API;