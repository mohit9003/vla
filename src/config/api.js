const API_URL = import.meta.env.VITE_API_URL || '/api';

const fetchWithCredentials = (url, options = {}) => {
  return fetch(url, {
    ...options,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

export const api = {
  auth: {
    signup: (data) => fetchWithCredentials(`${API_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    login: (data) => fetchWithCredentials(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    adminLogin: (data) => fetchWithCredentials(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  labs: {
    getAll: () => fetchWithCredentials(`${API_URL}/labs`),
    getById: (id) => fetchWithCredentials(`${API_URL}/labs/${id}`)
  },
  reports: {
    submit: (data) => fetchWithCredentials(`${API_URL}/reports`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    getByTeacherCode: (code) => fetchWithCredentials(`${API_URL}/reports/teacher/${code}`)
  },
  users: {
    getAll: () => fetchWithCredentials(`${API_URL}/users`)
  },
  announcements: {
    getAll: () => fetchWithCredentials(`${API_URL}/announcements`)
  },
  experiments: {
    getAll: () => fetchWithCredentials(`${API_URL}/experiments`),
    getById: (id) => fetchWithCredentials(`${API_URL}/experiments/${id}`)
  },
  ai: {
    chat: (data) => fetchWithCredentials(`${API_URL}/ai/chat`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
};
