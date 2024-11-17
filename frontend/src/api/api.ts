import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// const navigate = useNavigate({from:'/'})
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.status === 401) {
      // navigate({to:'/login'})
    }
    return error;
  },
);
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//
//     if (
//       error.response &&
//       error.response.status == 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//
//       try {
//         const refreshResponse = await api.post('/refreshToken');
//
//         const jwtToken = refreshResponse.data.jwtToken;
//         api.defaults.headers['Authorization'] = `Bearer ${jwtToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${jwtToken}`;
//
//         return api(originalRequest);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }
//     return error;
//   },
// );
