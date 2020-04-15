import axios from 'axios';
import router from '../router';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status == 401) {
      localStorage.isLogin = false;
      router.push('/login');
      throw err;
    }
  }
);

export default axios;
