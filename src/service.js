import axios from 'axios';

// הגדרת כתובת ה-API כ-default
axios.defaults.baseURL = 'https://todoapi-yssw.onrender.com';

// הוספת interceptor להוספת JWT token לכל בקשה
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// הוספת interceptor לתפיסת שגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('There was an error!', error);
    
    // אם קיבלנו 401 (Unauthorized), מעבירים לדף התחברות
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default {
  // פונקציות הזדהות
  register: async (username, password) => {
    const result = await axios.post('/register', { username, password });
    return result.data;
  },

  login: async (username, password) => {
    const result = await axios.post('/login', { username, password });
    if (result.data.token) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('username', result.data.username);
    }
    return result.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // פונקציות משימות
  getTasks: async () => {
    const result = await axios.get('/tasks');
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    const result = await axios.post('/tasks', { name });
    return result.data;
  },

  setCompleted: async (id, name, isComplete) => {
    console.log('setCompleted', { id, name, isComplete });
    const result = await axios.put(`/tasks/${id}`, { name, isComplete });
    return result.data;
  },

  updateTask: async (id, name, isComplete) => {
    console.log('updateTask', { id, name, isComplete });
    const result = await axios.put(`/tasks/${id}`, { name, isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    await axios.delete(`/tasks/${id}`);
  }
};
