import axios from 'axios';
import { getStoredUser } from '../storage'

const customerUrl = 'api/customers';
const jobUrl = 'api/jobs';
const partUrl = 'api/parts';
const userUrl = 'api/user';

const authHeader = () => {
  const token = getStoredUser();
  if (token) {
    return { 'metronics-access-token': token };
  } else {}
}

const API = {

  // CUSTOMERS
  searchCustomers(key, value) {
    return axios.get(`${customerUrl}?${key}=${value}`, { headers: authHeader() });
  },
  createCustomer(data) {
    return axios.post(customerUrl, data, { headers: authHeader() });
  },
  updateCustomer(id, data) {
    return axios.put(`${customerUrl}/${id}`, data, { headers: authHeader() });
  },
  deleteCustomer(id) {
    return axios.delete(`${customerUrl}/${id}`, { headers: authHeader() });
  },

  // JOBS
  searchJobs(key, value) {
    return axios.get(`${jobUrl}?${key}=${value}`, { headers: authHeader() });
  },
  createJob(data) {
    return axios.post(jobUrl, data, { headers: authHeader() });
  },
  updateJob(id, data) {
    console.log(data)
    return axios.put(`${jobUrl}/${id}`, data, { headers: authHeader() });
  },
  deleteJob(id) {
    return axios.delete(`${jobUrl}/${id}`, { headers: authHeader() });
  },
  deleteJobsByCustomerId(id) {
    return axios.delete(`${jobUrl}/many/${id}`, { headers: authHeader() });
  },

  // PARTS
  searchParts(key, value) {
    return axios.get(`${partUrl}?${key}=${value}`, { headers: authHeader() });
  },
  createPart(data) {
    return axios.post(partUrl, data, { headers: authHeader() });
  },
  updatePart(id, data) {
    return axios.put(`${partUrl}/${id}`, data, { headers: authHeader() });
  },
  deletePart(id) {
    return axios.delete(`${partUrl}/${id}`, { headers: authHeader() });
  },

  // AUTHENTICATION
  login(data) {
    return axios.post(`${userUrl}/login`, data);
  },
  searchUsers(username) {
    return axios.get(`${userUrl}?username=${username}`, { headers: authHeader() });
  },
  createUser(data) {
    return axios.post(userUrl, data, { headers: authHeader() });
  },
  updateUser(id, data) {
    return axios.put(`${userUrl}/${id}`, data, { headers: authHeader() });
  },
  deleteUser(id) {
    return axios.delete(`${userUrl}/${id}`, { headers: authHeader() });
  }
}

export default API;