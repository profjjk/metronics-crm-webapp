import ky from 'ky';

const customerUrl = 'http://localhost:8080/api/customers/';
const jobUrl = 'http://localhost:8080/api/jobs/';
const partUrl = 'http://localhost:8080/api/parts/';


const API = {
  // Customers
  getAllCustomers() {
    return ky.get(customerUrl).json();
  },
  getCustomerById(id) {
    return ky.get(customerUrl + id).json();
  },
  createCustomer(customer) {
    return ky.post(customerUrl, { json: customer }).json();
  },
  updateCustomer(customer) {
    return ky.put(customerUrl, { json: customer }).json();
  },
  deleteCustomer(id) {
    return ky.delete(customerUrl + id);
  },

  // Jobs
  getAllJobs() {
    return ky.get(jobUrl).json();
  },
  getJobById(id) {
    return ky.get(jobUrl + id).json();
  },
  createJob(job) {
    return ky.post(jobUrl, { json: job }).json();
  },
  updateJob(job) {
    return ky.put(jobUrl, { json: job }).json();
  },
  deleteJob(id,) {
    return ky.delete(jobUrl + id);
  },

  // Parts
  getAllParts() {
    return ky.get(partUrl).json();
  },
  getPartById(id) {
    return ky.get(partUrl + id).json();
  },
  createPart(part) {
    return ky.post(partUrl, { json: part }).json();
  },
  updatePart(part) {
    return ky.put(partUrl, { json: part }).json();
  },
  deletePart(id) {
    return ky.delete(partUrl + id);
  }
}

export default API;