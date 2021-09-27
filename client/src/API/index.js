import axios from 'axios';

const customerUrl = 'http://localhost:8080/api/customers/';
const partUrl = 'http://localhost:8080/api/parts/';

const API = {

  // CUSTOMERS
  getAllCustomers() {
    return axios.get(customerUrl);
  },
  getCustomerById(id) {
    return axios.get(customerUrl + id);
  },
  createCustomer(data) {
    return axios.post(customerUrl, data);
  },
  updateCustomerById(id, data) {
    return axios.put(customerUrl + id, data);
  },
  deleteCustomerById(id) {
    return axios.delete(customerUrl + id);
  },

  // PARTS
  getAllParts() {
    return axios.get(partUrl);
  },
  getPartById(id) {
    return axios.get(partUrl + id);
  },
  createPart(data) {
    return axios.post(partUrl, data);
  },
  updatePartById(id, data) {
    return axios.put(partUrl + id, data);
  },
  deletePartById(id) {
    return axios.delete(partUrl + id);
  },

  // JOBS
  addCustomerJob(id, data) {
    return axios.put(customerUrl + 'job/new/' + id, data);
  },
  updateCustomerJob(id, data) {
    return axios.put(customerUrl + 'job/update/' + id, data);
  },
  addPartToJob(id, data) {
    return axios.put(customerUrl + 'part/add/' + id, data);
  },
  removePartFromJob(id, data) {
    return axios.put(customerUrl + 'part/remove/' + id, data);
  }
}

export default API;