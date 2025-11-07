const API_URL = 'http://localhost:5000/api';

export const api = {
  auth: {
    signup: (data) => fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    login: (data) => fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    adminLogin: (data) => fetch(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  },
  labs: {
    getAll: () => fetch(`${API_URL}/labs`),
    getById: (id) => fetch(`${API_URL}/labs/${id}`)
  },
  reports: {
    submit: (data) => fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    getByTeacherCode: (code) => fetch(`${API_URL}/reports/teacher/${code}`)
  },
  users: {
    getAll: () => fetch(`${API_URL}/users`)
  }
};
