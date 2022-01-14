import axios from 'axios';
import { getStoredToken } from '../storage'

const customerUrl = 'https://metronics-webapp-server.herokuapp.com/api/customers';
const jobUrl = 'https://metronics-webapp-server.herokuapp.com/api/jobs';
const partUrl = 'https://metronics-webapp-server.herokuapp.com/api/parts';
const messageUrl = 'https://metronics-webapp-server.herokuapp.com/api/messages';
const requestUrl = 'https://metronics-webapp-server.herokuapp.com/api/requests';
const userUrl = 'https://metronics-webapp-server.herokuapp.com/api/users';
const authUrl = 'https://metronics-webapp-server.herokuapp.com/api/auth';

const authHeader = () => {
  const token = getStoredToken().token;
  if (token) {
    return { 'metronics': token };
  }
}

const API = {

  // CUSTOMERS
  getCustomers() {
    return axios.get(customerUrl, { headers: authHeader() });
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
  getJobs() {
    return axios.get(jobUrl, { headers: authHeader() });
  },
  createJob(data) {
    return axios.post(jobUrl, data, { headers: authHeader() });
  },
  updateJob(id, data) {
    return axios.put(`${jobUrl}/${id}`, data, { headers: authHeader() });
  },
  deleteJob(id) {
    return axios.delete(`${jobUrl}/${id}`, { headers: authHeader() });
  },
  deleteJobsByCustomerId(id) {
    return axios.delete(`${jobUrl}/clear/${id}`, { headers: authHeader() });
  },

  // PARTS
  getParts() {
    return axios.get(partUrl, { headers: authHeader() });
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

  // MESSAGES
  getMessages() {
    return axios.get(messageUrl, { headers: authHeader() });
  },
  updateMessage(id, data) {
    return axios.put(`${messageUrl}/${id}`, data, { headers: authHeader() });
  },
  deleteMessage(id) {
    return axios.delete(`${messageUrl}/${id}`, { headers: authHeader() });
  },

  // REQUESTS
  getRequests() {
    return axios.get(requestUrl, { headers: authHeader() });
  },
  deleteRequest(id) {
    return axios.delete(`${requestUrl}/${id}`, { headers: authHeader() });
  },

  // USERS
  getUser(id) {
    return axios.get(`${userUrl}/${id}`, { headers: authHeader() });
  },
  updateUser(id, data) {
    return axios.put(`${userUrl}/${id}`, data, { headers: authHeader() });
  },
  deleteUser(id) {
    return axios.delete(`${userUrl}/${id}`, { headers: authHeader() });
  },

  // AUTHENTICATION
  login(data) {
    return axios.post(`${authUrl}/login`, data);
  },
  register(data) {
    return axios.post(`${authUrl}/register`, data, { headers: authHeader() });
  }
}

export default API;