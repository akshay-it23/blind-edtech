import axios from 'axios';
import { notifyError, notifyApiError } from './toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Safe API call wrapper with error handling
export async function safeApiCall(promise, fallbackData = null, showError = true) {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    if (showError) {
      if (error.response?.data?.message) {
        notifyError(error.response.data.message);
      } else {
        notifyApiError();
      }
    }
    return fallbackData;
  }
}

// GET request with error handling
export async function apiGet(url, config = {}, fallbackData = null) {
  return safeApiCall(apiClient.get(url, config), fallbackData);
}

// POST request with error handling
export async function apiPost(url, data = {}, config = {}, fallbackData = null) {
  return safeApiCall(apiClient.post(url, data, config), fallbackData);
}

// PUT request with error handling
export async function apiPut(url, data = {}, config = {}, fallbackData = null) {
  return safeApiCall(apiClient.put(url, data, config), fallbackData);
}

// DELETE request with error handling
export async function apiDelete(url, config = {}, fallbackData = null) {
  return safeApiCall(apiClient.delete(url, config), fallbackData);
}

// PATCH request with error handling
export async function apiPatch(url, data = {}, config = {}, fallbackData = null) {
  return safeApiCall(apiClient.patch(url, data, config), fallbackData);
}

export default apiClient;
