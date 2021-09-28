import axios from 'axios';

const customerUrl = 'http://localhost:8080/api/customers';
const jobUrl = 'http://localhost:8080/api/jobs'
const partUrl = 'http://localhost:8080/api/parts';

const API = {

  // CUSTOMERS
  getAllCustomers() {
    return axios.get(customerUrl);
  },
  getCustomerById(id) {
    return axios.get(`${customerUrl}/${id}`);
  },
  searchCustomers(key, value) {
    return axios.get(`${customerUrl}?${key}=${value}`)
  },
  createCustomer(data) {
    return axios.post(customerUrl, data);
  },
  updateCustomerById(id, data) {
    return axios.put(`${customerUrl}/${id}`, data);
  },
  deleteCustomerById(id) {
    return axios.delete(`${customerUrl}/${id}`);
  },

  // PARTS
  getAllParts() {
    return axios.get(partUrl);
  },
  getPartById(id) {
    return axios.get(`${partUrl}/${id}`);
  },
  searchParts(key, value) {
    return axios.get(`${partUrl}?${key}=${value}`)
  },
  createPart(data) {
    return axios.post(partUrl, data);
  },
  updatePartById(id, data) {
    return axios.put(`${partUrl}/${id}`, data);
  },
  deletePartById(id) {
    return axios.delete(`${partUrl}/${id}`);
  },

  // JOBS
  getAllJobs() {
    return axios.get(jobUrl)
  },
  getJobById(id) {
    return axios.get(`${jobUrl}/${id}`);
  },
  searchJobs(key, value) {
    return axios.get(`${jobUrl}?${key}=${value}`)
  },
  createJob(data) {
    return axios.post(jobUrl, data);
  },
  updateJobById(id, data) {
    return axios.put(`${jobUrl}/${id}`, data);
  },
  deleteJobById(id) {
    return axios.delete(`${jobUrl}/${id}`);
  }
}

export default API;