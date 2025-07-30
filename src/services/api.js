import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Enhanced request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request ID for tracking (optional)
    config.headers['X-Request-ID'] = crypto.randomUUID();
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with retry logic
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

api.interceptors.response.use(
  (response) => {
    // You might want to transform successful responses here
    return response.data || response;
  },
  async (error) => {
    const originalConfig = error.config;
    
    // Don't retry if it's not a network error or already max retries
    if (!shouldRetry(error)) {
      return handleApiError(error);
    }
    
    return retryRequest(originalConfig);
  }
);

// Helper functions for better readability
function shouldRetry(error) {
  return (error.code === 'ECONNABORTED' || !error.response) && 
         (!error.config.retryCount || error.config.retryCount < MAX_RETRIES);
}

async function retryRequest(config) {
  if (!config.retryCount) config.retryCount = 0;
  config.retryCount += 1;
  
  await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
  return api(config);
}

function handleApiError(error) {
  const { response } = error;
  
  if (!response) {
    return Promise.reject(new Error('Network error. Please check your connection.'));
  }

  // Centralized error handling
  switch (response.status) {
    case 401:
      handleUnauthorized();
      break;
    case 403:
      console.error('Access forbidden:', response.data?.message);
      break;
    // Add more cases as needed
  }

  // Return consistent error format
  return Promise.reject({
    status: response.status,
    message: response.data?.message || error.message,
    errors: response.data?.errors, // For validation errors
    code: response.data?.code // For custom error codes
  });
}

function handleUnauthorized() {
  localStorage.removeItem('token');
  // Consider redirecting with a return URL
  window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
}

// Enhanced convenience methods with TypeScript support (if using TS)
export const get = (url, config = {}) => api.get(url, config);
export const post = (url, data, config = {}) => api.post(url, data, config);
export const put = (url, data, config = {}) => api.put(url, data, config);
export const patch = (url, data, config = {}) => api.patch(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);

export default api;